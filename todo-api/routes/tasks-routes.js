const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks-controller');

router.get('/', tasksController.getTasks);
router.get('/:uid', tasksController.getTasksByUserId);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:tid', tasksController.deleteTask);


module.exports = router;
