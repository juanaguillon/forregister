const mongod = require('mongoose');

// Binding connect mongodb database.
// Dynamic database name.
mongod.connect('mongodb://myUserAdmin:abc123@localhost:27017/users?authSource=admin', {useNewUrlParser: true});


module.exports = mongod;
