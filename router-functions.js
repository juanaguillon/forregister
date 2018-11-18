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
      lastname: req.body.lastname,
      password: req.body.password,
      verification_code: Math.floor( Math.random() * 99999999999 ) + 90000000000,
      status: false
    })

    newUser.save( err => {
      if( err ) throw err;

      res.status(200).send({stat:true});
    } )
  } 
  
}

module.exports = new RouterFunctions;