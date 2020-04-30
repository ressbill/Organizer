const express = require('express')
const router = express.Router()
const costsController = require('../controllers/costs')
router.get('', costsController.getAllCosts)
router.post('', costsController.create)
router.patch('/:id', costsController.update)
router.delete('/:id', costsController.remove)

module.exports = router
