const express = require('express');
const indexRouter = express.Router();

// This will be the route that serves your '/' homepage
indexRouter.get('/', (req, res) => {
  res.render('index');
});

// Route serves '/login' form
indexRouter.get('/login', (req, res) => {
  res.render('login');
});

// Route serves your '/signup' form
indexRouter.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = indexRouter;
