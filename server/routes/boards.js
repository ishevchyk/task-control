const express = require('express');
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware")
const {getBoards, addBoard, getBoardById, deleteBoardById, updateBoardById} = require("../controllers/boardsController");

router.get('/', authMiddleware, getBoards);
router.post('/', authMiddleware, addBoard);
router.get('/:id', authMiddleware, getBoardById);
router.delete('/:id', authMiddleware, deleteBoardById);
router.put('/:id', authMiddleware, updateBoardById);

module.exports = router;
