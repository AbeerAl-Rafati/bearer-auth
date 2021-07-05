'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    // return _authError();
    next('Invalid Login');
    return;
  }

  let authHeaders = req.headers.authorization.split(' ');
  if (authHeaders[0] !== 'Basic') {
    next('Invalid Login');
    return;
  }

  let basic = authHeaders[1];
  let [user, pass] = base64.decode(basic).split(':');

  try {
    req.user = await User.authenticateBasic(user, pass);
    req.token = User.generateToken(req.user);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}

