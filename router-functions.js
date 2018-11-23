const conection = require('./models/connect');
const schema = require('./models/schemas');

class RouterFunctions {
  
  renderRegisterUser( req, res ){
    res.render( 'register', {title: "Registro de Usuario" } )
  }   

  registerUser( req, res ){
    const user = conection.model("user", new conection.Schema( schema.registerUser ) );
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