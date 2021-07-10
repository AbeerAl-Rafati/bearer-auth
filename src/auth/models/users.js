'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const base64 = require('base-64');

const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Adds a virtual field to the schema. We can see it, but it never persists
// So, on every user object ... this.token is now readable!
users.virtual('token').get(function () {
  let tokenObject = {
    username: this.username,
  }
  return jwt.sign(tokenObject, base64.encode(process.env.SECRET));
});

users.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = bcrypt.hash(this.password, 10);
  }
});

// BASIC AUTH
users.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ username })
  const valid = await bcrypt.compare(password, user.password)
  if (valid) { return user; }
  throw new Error('Invalid User');
}

// users.statics.generateToken = function (user) {
//   return jwt.sign({ username: user.username }, process.env.SECRET);
// };

// BEARER AUTH
users.statics.authenticateWithToken = async function (token) {
  try {
    const payload = jwt.verify(token, base64.encode(process.env.SECRET));
    const user = await this.findOne({ username: payload.username })
    if (user) { return user; }
    throw new Error("User Not Found");
  } catch (e) {
    throw new Error(e.message)
  }
}


module.exports = mongoose.model('users', users);
