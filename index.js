'use strict';
require('dotenv').config()

// Start up DB Server
const mongoose = require('mongoose');


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, options)

  // Start the web server

  .then(() => {
    require('./src/server.js').start(process.env.PORT);
  })

  .catch((error) => {
    console.log('CONNECTION ERROR', error.message);
  });