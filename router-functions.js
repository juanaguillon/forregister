const model = require('./models/schemas');

class RouterFunctions {
  
  renderRegisterUser( req, res ){
    res.render( 'register', {title: "Registro de Usuario" } )
  }   

  registerUser( req, res ){
    const user = model.getModel( 'registerUser' );
    const newUser = new user({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    newUser.save( err => {
      if( err ) throw err;

      console.log( newUser.name );
    } )
  }
  
  
}

module.exports = new RouterFunctions;