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


exports.checkValidationAndFormErrorMessage = (errors) => {
        const errorsMessage = errors.errors.reduce((total, e) => {
            return total += e.msg + '. '
        }, '')
        const error = new Error(errorsMessage.slice(0, -2))
        error.status = 422
        return error
}
