const mongoose = require('mongoose');
const { Schema } = mongoose;

const boardsSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    default: 'Untitled Board',
    minLength: 3,
    maxLength: 40
  },
  description: {
    type: String,
    default: 'Board description goes here',
    minLength: 5,
    maxLength: 40
  },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'List',
  }]

}, {timestamps: {
    createdAt: "createdDate"
  }})


const Board = mongoose.model('Board', boardsSchema);

module.exports = {
  Board,
  boardsSchema
}
