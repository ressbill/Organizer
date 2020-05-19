const Wallet = require('../models/Wallet').wallet
const {validationResult} = require('express-validator')
const validation = require('../utils/validation')

exports.getAllCosts = async (req, res, next) => {
    const monthAgo = new Date()
    const numberOfDay = monthAgo.getDate()
    monthAgo.setDate(numberOfDay - 30)
    const userId = require('mongoose').Types.ObjectId(req.userData.userId)
    if (!req.query.limit) {
        req.query.limit = 20
    }
    if (!req.query.offset) {
        req.query.offset = 0
    }
    if (!req.query.all) {
        try {
            const costs = await Wallet
                .aggregate()
                .match({owner: userId})
                .unwind('costs')
                .project({costs: 1, _id: 0})
                .sort({'costs.date': -1})
                .replaceRoot('costs')
                .match({date: {$lte: new Date(), $gte: monthAgo}})
                .skip(+req.query.offset)
                .limit(+req.query.limit)
                .exec()

            res.status(200).json(costs)
        } catch (e) {
            next(e)
        }
    } else {
        try {
            const costs = await Wallet
                .aggregate()
                .match({owner: userId})
                .unwind('costs')
                .project({costs: 1, _id: 0})
                .sort({'costs.date': -1})
                .replaceRoot('costs')
                .skip(+req.query.offset)
                .limit(+req.query.limit)
                .exec()

            res.status(200).json(costs)
        } catch (e) {
            next(e)
        }
    }
}
exports.create = async (req, res, next) => {
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
                    costs: {
                        name: req.body.name,
                        price: req.body.price
                    },
                    income: []
                })

            res.status(201).json(newWallet.costs[0])
        } catch (e) {
            return next(e)
        }

    } else {
        try {
            await Wallet.updateOne({owner: req.userData.userId}, {
                $push: {
                    costs: {
                        name: req.body.name,
                        price: req.body.price
                    }
                }
            })
            // Fetch last document in income array for response
            const actualWallet = await Wallet.findOne({owner: req.userData.userId})
            res.status(201).json(actualWallet.costs[actualWallet.costs.length - 1])
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
            costs: {$elemMatch: {_id: req.params.id}}
        }, {
            $set: {"costs.$.name": req.body.name, "costs.$.price": req.body.price}
        })
        if (updatedQuery.n !== 0) {
            const cost = await Wallet.findOne({
                owner: req.userData.userId,
                costs: {$elemMatch: {_id: req.params.id}}
            }, {"costs.$": 1, _id: 0})
            const costObj = cost.costs[0]
            res.status(201).json(costObj)
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
        await Wallet.updateOne({owner: req.userData.userId}, {$pull: {costs: {_id: req.params.id}}})
        res.status(200).json({message: 'Cost was deleted'})
    } catch (e) {
        e.message = 'Cost was not removed or doesn\'t exist '
        next(e)
    }
}
