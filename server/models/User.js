const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const Joi = require('joi');
const dotenv = require('dotenv').config();
const { Schema } = mongoose;

const usersSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  firstname: {
    type: String,
    required: [true, 'Enter a firstname.'],
    minLength: [3, 'Firstname should be at least 3 characters.'],
    maxLength: 55
  },
  lastname: {
    type: String,
    required: [true, 'Enter a lastname.'],
    minLength: [3, 'Lastname should be at least 3 characters.'],
    maxLength: 55
  },
  username: {
    type: String,
    required: [true, 'Enter an username.'],
    unique: [true, 'Username is already taken.'],
    sparse: true,
    minLength: [5, 'Username should be at least 5 characters.'],
    maxLength: 55
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email is already registered.'],
    sparse: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [5, 'Password should be at least 5 characters long.'],
    maxLength: 1024
  },
  // assigned_boards: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Board',
  // }],

}, {timestamps: {
    createdAt: "createdDate"
  }})

usersSchema.methods.generateAuthToken = function () {
  return jwt.sign({_id: this._id}, dotenv.parsed.JWT_SECRET_KEY);
}

const User = mongoose.model('User', usersSchema);

// const validateUniqueness = (input) => {
//   console.log('Input', input)
//   return User.findOne({input})
//   console.log('user ', user)
//   return user
// }

// const validateUser = (user) => {
//   const schema = Joi.object({
//     email: Joi.string().min(1).max(55).email().required(),
//     password: Joi.string().min(1).max(255).required(),
//   });
//   return schema.validate(user)
// }
module.exports = {
  User,
  // validateUniqueness,
  // validateUser,
  usersSchema
}
