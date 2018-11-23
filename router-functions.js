/**
 * In This file, called functions refered to HTTP methods.
 */

const conection = require('./models/connect');
const schemas = require('./models/schemas');
const process = require('./backprocess');

class RouterFunctions {
  
  renderRegisterUser( req, res ){
    res.render( 'register', {title: "Registro de Usuario" } )
  }   

  registerUser( req, res ){
    const schema = new conection.Schema(schemas.registerUser);
    schema.pre('validate',function( next ){
      let user = this;

      
      if ( user.password !== req.body['r-password'] && process.checkEmail() ){
        
      }
    });
    const user = conection.model("user", schema  );
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