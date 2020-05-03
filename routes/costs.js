const express = require('express')
const router = express.Router()
const costsController = require('../controllers/costs')
const validation = require('../utils/validation')
const authGuard = require('../middlewares/authguard')


router.get('', authGuard, costsController.getAllCosts)
router.post('', validation.costCreate, authGuard, costsController.create)
router.patch('/:id', validation.costCreate, authGuard, costsController.update)
router.delete('/:id', authGuard, costsController.remove)

module.exports = router
