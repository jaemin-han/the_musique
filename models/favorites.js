const { ObjectID } = require('mongodb');
const { getDB } = require('../lib/dbconnect.js');

function getFavorites(req, res, next) {
  // Find all favorites based on your userId
  getDB().then((db) => {
    db.collection('favorites')
      .find({ userId: { $eq: req.session.userID } })
      .toArray((toArrErr, data) => {
        if(toArrErr) return next(toArrErr);
        res.favorites = data;
        db.close();
        next();
      });
      return false;
  });
  return false;
}

function saveFavorite(req, res, next) {
  // Create all of req.body into insertObj
  const insertObj = {};

  // Copy all of req.body into insertObj
  for(key in req.body) {
    insertObj[key] = req.body[key];
  }
  // Add userId to insertObj
  insertObj.favorite.userId = req.session.userId;

  getDB().then((db) => {
    db.collection('favorites')
      .insert(insertObj.favorite, (insertErr, result) => {
        if (insertErr) return next(insertErr);
        res.saved = result;
        db.close();
        next();
      });
      return false;
  });
  return false;
}

// Delete method doesnt change bc we are deleting objects from the database
// Based on the object's unique _id - you do not need to specify which user as
// the _id is sufficient enough -- yup.
function deleteFavorites(req, res, next) {
  getDB().then((db) => {
    db.collection('favorites')
      .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, result) => {
        if (removeErr) return next(removeErr);
        res.removed = result;
        db.close();
        next();
      });
      return false;
  });
  return false;
}

module.exports = {
  getFavorites,
  saveFavorite,
  deleteFavorites,
};
