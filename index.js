// Importing required modules
const express = require('express');
const routes = require('./routers/buckets');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// Creating an Express application instance
const app = express();

// Setting up middleware
app.use(logger('dev'));
app.use(cookieParser());
app.use('/', routes);

// Configuring the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
