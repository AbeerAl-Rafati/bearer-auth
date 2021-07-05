'use strict';

const users = require('../models/users.js')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('missing auth headers!'); return; }

    const token = req.headers.authorization.split(' ').pop();
    if (headers[0] !== 'Bearer') {
      next('invalid auth headers!');
      return;
    }

    const validUser = await users.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;

    next();
  } catch (e) {
    res.status(403).send(e.message);;
  }
}
