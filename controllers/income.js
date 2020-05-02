const Wallet = require('../models/Wallet').wallet
const {validationResult} = require('express-validator')
const validation = require('../utils/validation')

exports.getAllIncome = (req, res, next) => {
    res.send('GET ALL Income')
}
exports.create = async (req, res, next) => {
    //Check validity of input
    const errors = validationResult(req)
    if (!errors.isEmpty()){
       const error =  validation.checkValidationAndFormErrorMessage(errors)
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
            res.status(201).json(newWallet)
        } catch (e) {
         return  next(e)
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
            res.status(403).json(actualWallet.income[actualWallet.income.length - 1])
        } catch (e) {
            e.message = 'Income was not added. Please try again'
            next(e)
        }

    }

}
exports.update = (req, res, next) => {
    res.send('UPDATE Income')
}
exports.remove = (req, res, next) => {
    res.send('REMOVE Income')
}
