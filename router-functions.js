const model = require('./models/schemas');

class RouterFunctions {
  
  registerUser( req, res ){
    res.render( 'register', {title: "Registro de Usuario" } )
  }   
  
}

module.exports = new RouterFunctions;