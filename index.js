const dotenv = require('dotenv').config({ silent: true });
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');


// Routes folder
const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/auth');
const musicRouter = require('./routes/music');
const usersRouter = require('./routes/users');

const app = express();
const SECRET = 'music3000';

app.set('view engine', 'ejs');

// log request
app.use(morgan('dev'));

// Parse application
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

// Middleware for method override
app.use(methodOverride('_method'));

// Read the cookies sent over from the browser
app.use(cookieParser());

app.use(session({
  reserve: false,
  saveUninitialized: false,
  secret: SECRET,
}));

// Set static file root folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes -- subpages
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/music', musicRouter);
app.use('/users', usersRouter);

// Port listening for connections
// Sidenote: 'process.env.PORT' is needed for when we deploy to Heroku
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Music is Life at ${port}`);
});
