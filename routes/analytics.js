const express = require('express')
const router = express.Router()
const authGuard = require('../middlewares/authguard')
const analyticsController = require('../controllers/analytics')
router.get('',authGuard, analyticsController.overview)
module.exports = router
