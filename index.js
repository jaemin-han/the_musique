const dotenv = require('dotenv').config({ silent: true });
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

// Routes folder
// const indexRouter = require('./routes/index.js');

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));

// Parse application
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

// Set static file root folder
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);

// Port listening for connections
// Sidenote: 'process.env.PORT' is needed for when we deploy to Heroku
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Music is Life at ${port}`);
});
