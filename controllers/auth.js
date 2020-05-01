const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const validation = require('../utils/validation')
exports.register = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        const error = validation.checkValidationAndFormErrorMessage(errors)
        return next(error)
    }

    try {
        const candidate = await User.findOne({email: req.body.email})
        if (candidate) {
            res.status(406).json({message: `User with ${req.body.email} email already exists`})
        } else {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                email: req.body.email,
                password
            })
            user.save().then(() => {
                res.status(201).json(user)
            }).catch(e => {
                const error = new Error('Saving to db failed')
                error.status = 501
                next(error)
            })
        }
    } catch (e) {
        if(!e.status){
            e.status = 500
        }
        next(e)
    }

}

exports.login = (req, res, next) => {
    res.send('Login')
}
