const express = require('express');
const routes = require('./routers/buckets');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express();
app.use(logger('dev'));
const port = 3000;

app.use(cookieParser());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
