const express = require('express')
const validation = require('../utils/validation')
const router = express.Router()
const tasksController = require('../controllers/tasks')
const authGuard = require('../middlewares/authguard')

router.get('/', authGuard, tasksController.getAllTasks)
router.post('/', authGuard,validation.postCreate, tasksController.create)
router.patch('/:id', authGuard, tasksController.update)
router.delete('/:id', authGuard, tasksController.remove)

module.exports = router
