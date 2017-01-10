const router = require('express').Router();
const { authenticate } = require('../lib/auth');
// const { searchMusic } = require('../services/itunes');
const { getFavorites, searchMusic, deleteFavorites, saveFavorite } = require('../models/favorites');

router.get('/', authenticate, getFavorites, (req, res) => {
  res.render('music/index', {
  });
});

router.post('/search', authenticate, searchMusic, (req, res) => {
  res.render('music/index', {
  });
});

router.delete('/favorite/:id', deleteFavorites, (req, res) => {
  res.redirect('/music');
});

router.post('/favorites', saveFavorite, (req, res) => {
    res.redirect('/music');
});

module.exports = router;
