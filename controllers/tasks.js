const Task = require('../models/Task')
const {validationResult} = require('express-validator')
const validation = require('../utils/validation')
const moment = require('moment')
//
// n1 = 5 offset = 10
// ?previous=true&limit=n1&offset=n2
// previous => Показывать прошедшие задачи
// !previous => Стандартный запрос на будущие задачи
// date => Показывать задачи на этот день (date)
//
exports.getAllTasks = async (req, res, next) => {
    console.log(req.query)
    const query = {
        creator: req.userData.userId
    }
    if (!req.query.limit) {
        req.query.limit = 20
    }
    if (!req.query.offset) {
        req.query.offset = 0
    }
    if (req.query.previous === 'true') {
        query.date = {
            $lte: new Date()
        }
    }
    if (!req.query.previous || req.query.previous === 'false') {
        query.date = {
            $gte: new Date()
        }
    }
    if (req.query.date) {
        const start = new Date(req.query.date)
        start.setDate(start.getDate())
        start.setHours(0, 0, 0, 0)
        const end = new Date(req.query.date)
        end.setDate(end.getDate())
        end.setHours(23, 59, 59, 59)
        query.date = {
            $gte: start,
            $lte: end
        }
    }
    try {
        const tasks = await Task.find(query, '_id name text date')
            .sort({date: 1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
        res.status(200).json(tasks)
    } catch (e) {
        e.message = 'Fetch failed'
        next(e)
    }

}

exports.create = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = validation.checkValidationAndFormErrorMessage(errors)
        return next(error)
    }
    const task = {name: req.body.name, text: req.body.text, creator: req.userData.userId}
    try {

        // Form date with a help of moment.js out of req.body.date.
        // If parse failed returns null.Otherwise ISODate

        const isValid = moment(req.body.date).isValid()
        if (!isValid) {
            return res.status(406).json({message: 'Date is wrong'})
        }
        // const isoDate = moment(req.body.date).toISOString()
        // if (isoDate === null) {
        //     return res.status(406).json({message: 'Date is wrong'})
        // }
        try{
            const repeatedTask = await Task.findOne({$and: [{date: req.body.date}, {name: req.body.name}]})
            if (repeatedTask) {
                console.log('inside')
                return res.status(409).json({message: 'Task credentials must be unique'})
            }
        } catch (e) {
            e.status = 409
            e.message = 'Task credentials must be unique'
            return next(e)
        }
        console.log('here')
        const isoDate = moment(req.body.date).toISOString()
        task.date = isoDate
        const createdTask = await Task.create(task)
        res.status(201).json(createdTask)
    } catch (e) {
        // if (e.errors.name.kind === 'unique' || e.errors.name.kind ) {
        //     e.message = "Name of the task must be unique"
        //     e.status = 409
        //     return next(e)
        // }
        console.log(e)
        next(e)
    }
}
exports.update = async (req, res, next) => {
    if (req.body.name) {
        try {
            const candidate = await Task.findOneAndUpdate(
                {creator: req.userData.userId, _id: req.params.id},
                {$set: {name: req.body.name, text: req.body.text, date: req.body.date}},
                {new: true, useFindAndModify: false}
            )
            if (candidate) {
                res.status(200).json(candidate)
            } else {
                const error = new Error('No task found')
                error.status = 404
                next(error)
            }

        } catch (e) {
            e.message = '\'No task found\''
            next(e)
        }
    } else {
        const error = new Error('Request body doesn\'t contain required data')
        error.status = 400
        next(error)
    }

}
exports.remove = async (req, res, next) => {
    try {
        const result = await Task.deleteOne({_id: req.params.id, creator: req.userData.userId})
        if (result.n > 0) {
            res.status(200).json({message: 'Task deleted successfully'})
        } else {
            res.status(404).json({message: 'There is no such task'})
        }
    } catch (e) {
        const error = new Error('Deletion failed')
        next(error)
    }


}
