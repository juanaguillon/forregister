const model = require('./models/schemas');

class RouterFunctions {
  
  registerUser( req, res ){
    res.render( 'register', {title: "Registro de Usuario" } )
    let userModel = model.getModel('user')
    let user = new userModel({
      name: req.query.name,
      email: 'joel@gmail.com',
      password: '1234'
    });

    user.save( err => {
      if ( err ) throw new err;
    })
  }   
  
}

module.exports = new RouterFunctions;