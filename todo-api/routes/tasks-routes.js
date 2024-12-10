const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks-controller');

router.get('/', tasksController.getTasks);
router.get('/:uid', tasksController.getTasksByUserId);


module.exports = router;
