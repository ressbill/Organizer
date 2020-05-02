const {body} = require('express-validator')
exports.userCreation = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail()
    ,
    body('password')
        .trim()
        .isLength({min: 5})
        .withMessage('Password should be at least 5 characters')
]

exports.userLogin = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail()
    ,
    body('password')
        .trim()
        .isLength({min: 5})
        .withMessage('Password should be at least 5 characters')
]
exports.postCreate = [
    body('name')
        .trim()
        .isLength({min: 3})
        .withMessage('Name of the task must be at least 3 characters'),
]
exports.postUpdate = [
    body('name')
        .trim()
        .isLength({min: 3})
        .withMessage('Name of the task must be at least 3 characters'),
]
exports.checkValidationAndFormErrorMessage = (errors) => {
        const errorsMessage = errors.errors.reduce((total, e) => {
            return total += e.msg + '. '
        }, '')
        const error = new Error(errorsMessage.slice(0, -2))
        error.status = 422
        return error
}
