const express = require('express')
const router = express.Router()
const incomeController = require('../controllers/income')
router.get('', incomeController.getAllIncome)
router.post('', incomeController.create)
router.patch('/:id', incomeController.update)
router.delete('/:id', incomeController.remove)

module.exports = router
