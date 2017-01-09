const MongoClient = require('mongodb');

// process.env.MONGOLAB_URI is deprecated
// process.env.MONGODB_URI is needed for when deploying to Heroku
const connectionURL = process.env.MONGOLAB_URI || 'mongodb://localhost/user_auth_itunes';

function getDB() {
  return MongoClient.connect(connectionURL);
}

module.exports = getDB;
