const {List} = require("../models/List")
const {Board} = require("../models/Board");
const {Task} = require("../models/Task");

const getLists = async (req, res, next) => {
  try{
    const userId = req.user._id;
    const board = await Board.findById(req.params.boardId);
    const lists = await List.find({
      createdBy: userId,
      boardId: board._id
    }).populate('tasks')
    res.status(200).send(lists)
  } catch (err) {
    next(err);
  }

}

const addList = async (req, res, next) => {
  try {
    const {name} = req.body;
    const board = await Board.findById(req.params.boardId);
    if(!board) throw new Error('cannot read board')
    const list = await new List({
      createdBy: req.user._id,
      boardId: board._id,
      name
    })
    await list.save()
    await board.updateOne({$push: {lists: list}})
    // await board.populate('lists')
    // let lists = await List.find({
    //   createdBy: req.user._id
    // }).populate('tasks')

    res.send(
      list
    )
    // можна ше дефолтні лісти додати
  } catch (err) {
    next(err);
  }
}

const deleteListById = async (req, res, next) => {
  try {

    const userId = req.user._id;
    console.log('param ', req.params.id)
    console.log('Query param ', req.query.board)
    const list = await List.findById(req.params.id);
    // const board = await Board.find({_id: req.query.board})
    console.log('list ',list)
    // console.log('board ', board)

    if(!list) throw new Error('No lists by provided ID');
    if(list.createdBy.toString() !== userId ) throw new Error('You cannot delete other users list');


    // await Board.find({_id: req.query.board}).populate({path: 'lists', match: {_id: {$ne: req.params.id}}})
    // await board.updateOne({$pull: {lists: list}})
    await Board.findByIdAndUpdate(req.query.board, {$pull: {lists: list._id}})
    await List.deleteOne({_id: req.params.id})
    await Task.deleteMany({listId: req.params.id})
    res.send( { "message": "Removed" } )
  } catch (err) {
    console.log(err)
    next(err);
  }
}

const updateListById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // const list = await List.findById(req.params.id);
    //
    // if(!list) throw new Error('No lists by provided ID');
    // if(list.createdBy.toString() !== userId ) throw new Error('You cannot change other Users list');

    const dataToUpdate = await req.body;

    await List.updateOne({_id: req.params.id}, {
      $set: dataToUpdate
    }, {new: true})
    let list = await List.findById(req.params.id);
    res.send(list)
  } catch (err) {
    next(err);
  }
}

const getListById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const list = await List.findById(req.params.id);

    if(!list) throw new Error('No lists by provided ID');
    if(list.createdBy.toString() !== userId ) throw new Error('You cannot get other users lists');

    res.send( { list } )
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getLists,
  addList,
  getListById,
  deleteListById,
  updateListById
}
