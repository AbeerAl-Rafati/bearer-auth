'use strict';
require('dotenv').config();
const server = require('./src/server')


// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.port || 3000;

mongoose.connect(MONGODB_URI, options)

  .then(() => {
    // Start the web server
    server.start(PORT);
  })

  .catch(err => console.error('connection error', err.message));