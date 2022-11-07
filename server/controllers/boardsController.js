const {Board} = require( "../models/Board");
const {List} = require("../models/List");
const {Task} = require("../models/Task");

const getBoards = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let boards = await Board.find({
      createdBy: userId
    }).populate('lists')
    console.log(boards)

    res.status(200).send(boards)

  } catch (err) {
    next(err);
  }
}

const addBoard = async (req, res, next) => {
  try {
    const {name, description} = req.body;
    const board = await new Board({
      createdBy: req.user._id,
      name,
      description
    })
    await board.save()
    res.send(board)
  } catch (err) {
    next(err)
  }
}

const deleteBoardById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const board = await Board.findById(req.params.id);

    if(!board) throw new Error('No boards by provided ID');
    if(board.createdBy.toString() !== userId ) throw new Error('You cannot delete other users board');

    await Board.deleteOne({_id: req.params.id})
    await List.deleteMany({boardId: req.params.id})
    res.send( { "message": "Removed" } )
  } catch (err) {
    next(err)
  }
}

const updateBoardById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // let board = await Board.findById(req.params.id);
    //
    // if(!board) throw new Error('No boards by provided ID');
    // if(board.createdBy.toString() !== userId ) throw new Error('You cannot change other Users board');
    const dataToUpdate = await req.body;
    await Board.updateOne({_id: req.params.id}, {
      $set: dataToUpdate
    }, {new: true})

    let board = await Board.findById(req.params.id);
    res.send(board)
  } catch (err) {
    next(err)
  }
}


const getBoardById = async (req, res) => {
  try {
    const userId = req.user._id;
    const board = await Board.findById(req.params.id);

    if(!board) throw new Error('No boards by provided ID');
    if(board.createdBy.toString() !== userId ) throw new Error('You cannot get other users boards');


    await board.populate('lists')

    res.send(board)
  } catch (err) {
    res.status(404).send({ "message": err.message })
  }
}
module.exports = {
  getBoards,
  addBoard,
  getBoardById,
  deleteBoardById,
  updateBoardById
}
