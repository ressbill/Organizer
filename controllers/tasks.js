const Task = require('../models/Task')
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
        req.query.limit = 10
    }
    if (!req.query.offset) {
        req.query.offset = 0
    }
    if (req.query.previous === 'true') {
        query.date = {
            $lte : new Date()
        }
    }
    if (req.query.previous === 'false' || !req.query.previous) {
        query.date = {
            $gte : new Date()
        }
    }
    //TODO
    if (req.query.date) {
        query.date = {
            $gte : new Date(),
            $lt: new Date() +1
        }
    }
    try {
        const tasks = await Task.find(query)
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
    const task = {name: req.body.name, text: req.body.text, date: req.body.date, creator: req.userData.userId}
    try {
        const createdTask = await Task.create(task)
        res.status(200).json(createdTask)
    } catch (e) {
        const error = new Error(`Saving is failed. Task: '${req.body.name}' is already created`)
        error.status = 409
        next(error)
    }
}
exports.update = async (req, res, next) => {
    if (req.body.name && req.body.text) {
        try {
            const candidate = await Task.findOneAndUpdate(
                {creator: req.userData.userId, _id: req.params.id},
                {$set: {name: req.body.name, text: req.body.text}},
                {new: true, useFindAndModify: false}
            )
            res.status(202).json(candidate)
        } catch (e) {
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
            res.status(200).json({message: 'There is no such task'})
        }
    } catch (e) {
        const error = new Error('Deletion failed')
        next(error)
    }


}
