const express = require('express')
const router = express.Router()

const authGuard = require('../middlewares/authguard')
const incomeController = require('../controllers/income')
const validation = require('../utils/validation')

router.get('', authGuard, incomeController.getAllIncome)
router.post('', authGuard, validation.incomeCreate, incomeController.create)
router.patch('/:id', authGuard,validation.incomeCreate, incomeController.update)
router.delete('/:id', authGuard, incomeController.remove)

module.exports = router
