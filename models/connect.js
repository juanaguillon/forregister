const mongod = require('mongoose');

mongod.connect('mongodb://localhost:27017/users', {useNewUrlParser: true});
const schema = mongod.Schema;
const userSchema = new schema({
  name: String,
  psw: String,
  lastLogin: {type:Date , default: Date.now },
  email: { type: String, match: /^[a-zA-Z0-9_\.\-]+@(gmail|outlook|hotmail|yahoo)+\.[a-zA-Z0-9]+$/ }
} );

const modelUsers = mongod.model( "userLogin" , userSchema )

let functions = {
  create:function( ){
    const user = new modelUsers({
      email: 'joel@hotmail.com',
      name: "Juan Aguillon",
      psw: "TotalDesaster"
    })

    user.save( ( err , response) => {
      if ( err ) throw err;

      console.log('Salvado');
    })

  }
}

module.exports = functions;