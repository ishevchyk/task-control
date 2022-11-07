const {User} = require('../models/User')
const bcrypt = require("bcryptjs");
const _ = require('lodash')
const mongoose = require("mongoose");

const registerUser = async (req, res, next) => {
  try {
    const {firstname, lastname, username, email, password} = await req.body;
    let user = await new User({
      _id: new mongoose.Types.ObjectId(),
      firstname,
      lastname,
      username,
      email,
      password
    });

    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hashSync(user.password, salt);

    await user.save()

    res.send({
      message: "Success"
    });

  } catch (err) {
    next(err)
  }
}
const loginUser = async (req, res, next) => {
  try {
    let user = await User.findOne({$or: [{email: req.body.email}, {username: req.body.email}]});
    if (!user) throw new Error('Invalid login data. Try one more time!')

    const validPassword = await bcrypt.compareSync(String(req.body.password), String(user.password));
    if (!validPassword) throw new Error('Invalid login data. Try one more time!')

    const token = user.generateAuthToken();
    user = _.pick(user, ['email', 'username', 'firstname', 'lastname', '_id'])

    res.header('x-auth-token', token).send({
      ...user,
      "jwt_token": `${token}`
    })
  } catch (err) {
    next(err)
  }
}


module.exports = {
  registerUser,
  loginUser,
}
