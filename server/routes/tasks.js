const express = require('express');
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware")
const {getTasks, addTask, getTaskById, deleteTaskById, updateTaskById} = require("../controllers/tasksController");

router.get('/:listId', authMiddleware, getTasks);
router.post('/:listId', authMiddleware, addTask);
router.get('/:id', authMiddleware, getTaskById);
router.delete('/:id', authMiddleware, deleteTaskById);
router.put('/:id', authMiddleware, updateTaskById);

module.exports = router;
