const express = require('express')
const router = express.Router()
const analyticsController = require('../controllers/analytics')
router.get('', analyticsController.overview)
module.exports = router
