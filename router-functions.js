const model = require('./models/schemas');

class RouterFunctions {
  
  registerUser( ){
    let userModel = model.getModel( "user", model.getSchema('userlogin') )
    let user = new userModel({
      name: 'Juan Aguillon',
      email: 'joel@gmail.com',
      password: '1234'
    });

    user.save( err => {
      if ( err ) throw new err;

      console.log('salvado');
    })
  } 
  
}

module.exports = new RouterFunctions;