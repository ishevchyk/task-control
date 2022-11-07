const {List} = require("../models/List");
const {Task} = require("../models/Task");
const {Board} = require("../models/Board");


const getTasks = async (req, res) => {
  try {
  const userId = req.user._id;
  const list = await List.findById(req.params.listId);
  const tasks = await Task.find({
    createdBy: userId,
    listId: list._id
  })
  res.status(200).send({tasks})
} catch (err) {
  next(err);
}
}

const addTask = async (req, res, next) => {
  try {
    console.log(req.body)
    const {content} = req.body;
    const list= await List.findById(req.params.listId);
    if(!list) throw new Error('cannot read board')
    const task = await new Task({
      createdBy: req.user._id,
      listId: list._id,
      content
    })
    await task.save()
    await list.updateOne({$push: {tasks: task}})
    res.send(task)
    List.find().populate('tasks')
    // можна ше дефолтні лісти додати
  } catch (err) {
    next(err);
  }
}

const deleteTaskById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const task = await Task.findById(req.params.id);
    const listId = task.listId
    // console.log('listid ', listId)

    if(!task) throw new Error('No tasks by provided ID');
    if(task.createdBy.toString() !== userId ) throw new Error('You cannot delete other users task');
    // await List.findByIdAndUpdate(req.query.list, {$pull: {tasks: task._id}})
    await List.findByIdAndUpdate(listId, {$pull: {tasks: task._id}})
    // const list = await List.findById(listId)
    // console.log('list', list)
    await Task.deleteOne({_id: req.params.id})
    res.send( { "message": "Removed" } )
  } catch (err) {
    next(err);
  }
}

const updateTaskById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // const task = await Task.findById(req.params.id);

    // if(!task) throw new Error('No tasks by provided ID');
    // if(task.createdBy.toString() !== userId ) throw new Error('You cannot change other Users task');

    const dataToUpdate = await req.body;

    await Task.updateOne({_id: req.params.id}, {
      $set: dataToUpdate
    }, {new: true})

    let task = await Task.findById(req.params.id);
    res.send(task)
  } catch (err) {
    next(err);
  }
}

const getTaskById = async (req, res) => {
  try {
    const userId = req.user._id;
    const task = await Task.findById(req.params.id);

    if(!task) throw new Error('No tasks by provided ID');
    if(task.createdBy.toString() !== userId ) throw new Error('You cannot get other users tasks');

    res.send( { task } )
  } catch (err) {
    res.status(404).send({ "message": err.message })
  }
}

module.exports = {
  getTasks,
  addTask,
  getTaskById,
  deleteTaskById,
  updateTaskById
}
