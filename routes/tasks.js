const express = require('express')
const router = express.Router()
const tasksController = require('../controllers/tasks')
router.get('/tasks', tasksController.getAllTasks)
router.post('/task', tasksController.create)
router.patch('/:id', tasksController.update)
router.delete('/:id', tasksController.remove)

module.exports = router
