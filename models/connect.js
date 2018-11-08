const mongod = require('mongoose');

// Binding connect mongodb database.
// Dynamic database name.
mongod.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});


module.exports = mongod;
