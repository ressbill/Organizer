const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const User =  require('../models/User').user
const validation = require('../utils/validation')
const jwtSecret = require('../utils/keys')['jwt_key']

exports.register = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
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
        if (!e.status) {
            e.status = 500
        }
        next(e)
    }

}

exports.login = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = validation.checkValidationAndFormErrorMessage(errors)
        return next(error)
    }
    const candidate = await User.findOne({email: req.body.email})
    if (!candidate) {
        res.status(404).json({message: `${req.body.email} is not registered`})
    } else {
         bcrypt.compare(req.body.password, candidate.password).then((passwordsMatch) => {
             if (passwordsMatch) {
                 const token = jwt.sign(
                     {email: candidate.email, userId: candidate._id},
                     jwtSecret,
                     {expiresIn: '48h'})
                 res.status(200).json({token})
             }else {
                 res.status(409).json({message: 'Password is false'})
             }
         }).catch(error => {
             next(error)
         })

    }
}
