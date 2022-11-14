const mongoose = require('mongoose');
const { Schema } = mongoose;

const tasksSchema = new mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List',
  },
  // boardId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Board',
  // },
  content: {
    type: String,
    minLength: 3,
    maxLength: 40
  },
  cover: {
    type: String,
    default: '#d2e86d'
  },
  comments: [{type: String}],

}, {timestamps: {
    createdAt: "createdDate"
  }})


const Task = mongoose.model('Task', tasksSchema);

module.exports = {
  Task,
  tasksSchema
}
