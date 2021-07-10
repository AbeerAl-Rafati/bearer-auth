'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {

  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Basic') { return res.status(403).send('tell me about the error', e.message); }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    req.user = await User.authenticateBasic(user, pass)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
    // console.log(req.headers.authorization);
  }

}

