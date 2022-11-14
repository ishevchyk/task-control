const express = require('express');
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware")
const {getTasks, addTask, getTaskById, deleteTaskById, updateTaskById, addComment, deleteComment} = require("../controllers/tasksController");

router.get('/:listId', authMiddleware, getTasks);
router.post('/:listId', authMiddleware, addTask);
router.get('/:id', authMiddleware, getTaskById);
router.delete('/:id', authMiddleware, deleteTaskById);
router.put('/:id', authMiddleware, updateTaskById);
router.patch('/:id/addComment', authMiddleware, addComment);
router.patch('/:id/deleteComment', authMiddleware, deleteComment);

module.exports = router;
