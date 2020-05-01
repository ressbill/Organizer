const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const authValidation = require('../utils/validation')

router.post('/register', authValidation.userCreation, authController.register)
router.post('/login',authValidation.userLogin, authController.login)

module.exports = router
