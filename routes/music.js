const router = require('express').Router();
const { authenticate } = require('../lib/auth');
const { searchMusic } = require('../services/itunes');
const { getFavorites, deleteFavorites, saveFavorite } = require('../models/favorites');

// User Info, Result/Favorites
router.get('/', authenticate, getFavorites, (req, res) => {
  res.render('music/index', {
    user: res.user,
    results: res.results || [],
    favorites: res.favorites || [],
  });
});

// Search Route
router.post('/search', authenticate, searchMusic, getFavorites, (req, res) => {
  res.render('music/index', {
    user: res.user,
    results: res.results || [],
    favorites: res.favorites || [],
  });
});

// Get favorites by id - delete
router.delete('/favorites/:id', deleteFavorites, (req, res) => {
  res.redirect('/music');
});

router.post('/favorites', saveFavorite, (req, res) => {
  res.redirect('/music');
});

module.exports = router;
