const mongoose = require('mongoose');
const { Schema } = mongoose;

const listsSchema = new mongoose.Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    default: 'Untitled List',
    minLength: 3,
    maxLength: 40
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]

}, {timestamps: {
    createdAt: "createdDate"
  }})


const List = mongoose.model('List', listsSchema);

module.exports = {
  List,
  listsSchema
}
