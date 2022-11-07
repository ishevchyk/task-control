const express = require('express');
const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware")
const {getLists, addList, getListById, deleteListById, updateListById} = require("../controllers/listsController");

router.get('/:boardId', authMiddleware, getLists);
router.post('/:boardId', authMiddleware, addList);
router.get('/:id', authMiddleware, getListById);
router.delete('/:id', authMiddleware, deleteListById);
router.put('/:id', authMiddleware, updateListById);

module.exports = router;
