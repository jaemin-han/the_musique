const express = require('express');
const { logIn } = require('../lib/auth');

// Router
const authRouter = express.Router();

// Log in and if successful, assign res.user_id to the session
// 'logIn' middleware from the ../lib/auth to parse the form input
// and save user to the database
authRouter.post('/', logIn, (req, res) => {
  res.redirect('/users/profile');
});

// Logout by assigning null to the userId in the session
authRouter.delete('/', (req, res) => {
  req.session.userId = null;
  res.redirect('/');
});

module.exports = authRouter;
