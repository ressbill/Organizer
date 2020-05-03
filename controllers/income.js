const Wallet = require('../models/Wallet').wallet
const {validationResult} = require('express-validator')
const validation = require('../utils/validation')
const myDates = require('../utils/formingDates')

exports.getAllIncome = async (req, res, next) => {
    const userId = require('mongoose').Types.ObjectId(req.userData.userId)
    if (!req.query.limit){
        req.query.limit = 20
    }
    if (!req.query.offset){
        req.query.offset = 0
    }
    if (!req.query.all) {
        try {
            const income = await Wallet
                .aggregate()
                .match({owner: userId})
                .unwind('income')
                .project({income:1, _id:0})
                .sort({'income.date': -1})
                .replaceRoot('income')
                .match({date: {$lt:myDates.now, $gte: myDates.monthAgo }})
                .skip(+req.query.offset)
                .limit(+req.query.limit)
                .exec()

            res.status(200).json(income)
        } catch (e) {
            next(e)
        }
    } else {
        try {
            const income = await Wallet
                .aggregate()
                .match({owner: userId})
                .unwind('income')
                .project({income:1, _id:0})
                .sort({'income.date': -1})
                .replaceRoot('income')
                .skip(+req.query.offset)
                .limit(+req.query.limit)
                .exec()

            res.status(200).json(income)
        } catch (e) {
            next(e)
        }
    }

}
exports.create = async (req, res, next) => {
    //Check validity of input
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = validation.checkValidationAndFormErrorMessage(errors)
        return next(error)
    }
    const candidateWallet = await Wallet.findOne({owner: req.userData.userId})
    if (!candidateWallet) {
        try {
            const newWallet = await Wallet.create(
                {
                    owner: req.userData.userId,
                    income: {
                        name: req.body.name,
                        amount: req.body.amount
                    },
                    costs: []
                })

            res.status(201).json(newWallet.income[0])
        } catch (e) {
            return next(e)
        }

    } else {
        try {
            await Wallet.updateOne({owner: req.userData.userId}, {
                $push: {
                    income: {
                        name: req.body.name,
                        amount: req.body.amount
                    }
                }
            })
            // Fetch last document in income array for response
            const actualWallet = await Wallet.findOne({owner: req.userData.userId})
            res.status(201).json(actualWallet.income[actualWallet.income.length - 1])
        } catch (e) {
            e.message = 'Income was not added. Please try again'
            next(e)
        }

    }

}
exports.update = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = validation.checkValidationAndFormErrorMessage(errors)
        return next(error)
    }
    try {
        const updatedQuery = await Wallet.updateOne({
            owner: req.userData.userId,
            income: {$elemMatch: {_id: req.params.id}}
        }, {
            $set: {"income.$.name": req.body.name, "income.$.amount": req.body.amount}
        })
        if (updatedQuery.n !== 0) {
            const income = await Wallet.findOne({
                owner: req.userData.userId,
                income: {$elemMatch: {_id: req.params.id}}
            }, {"income.$": 1, _id: 0})
            const incomeObj = income.income[0]
            res.status(201).json(incomeObj)
        } else {
            const e = new Error('Not found')
            e.status = 404
            next(e)
        }

    } catch (e) {
        e.message = 'Update failed. Id is wrong'
        next(e)
    }

}
exports.remove = async (req, res, next) => {
    try {
        await Wallet.updateOne({owner: req.userData.userId}, {$pull: {income: {_id: req.params.id}}})
        res.status(200).json({message: 'Income was deleted'})
    } catch (e) {
        e.message = 'Income was not removed or doesn\'t exist '
        next(e)
    }

}
