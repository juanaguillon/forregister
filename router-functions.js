/**
 * In This file, called functions refered to HTTP methods.
 */

const model = require('./models/schemas');
const process = require('./backprocess');


class RouterFunctions {

  renderRegisterUser( req, res ){
    res.render( 'register', {title: "Registro de Usuario" } )
  }

  renderRegisterSuccess ( req, res ){
    if ( req.session.userId && ! req.session.status ){
      res.render('register-success',{title:"Verificación de registro"})

    }else{
      res.status(200).send({stat:'Meessage no routed'});
    }
  }

  registerUser( req, res ){
    const schema = model.schemas.registerUser;


    schema.pre('validate',function( next ){
      if (this.password == req.body['r-password'] && process.checkEmail(this.email) ){

        var query = user.findOne({ email: this.email }, "email")
        query.exec( function(err, doc){

          if (doc != null) {
            res.status(400).send({ stat: false, message: "Email ingresado no disponible" });
          } else {
            next()
          }
        } )
      }
    });
    const user = model.connection.model("user", schema  );
    const newUser = new user({
      name: req.body.name,
      email: req.body.email,
      lastname: req.body.lastname,
      password: req.body.password,
      verification_code: Math.floor( Math.random() * 99999999999 ) + 10000000000,
      status: false
    })

    newUser.save( err => {
      if( err ) throw "Error al guardar el usuario, error:" + err;
      process.sendEmail('<h1>Crear Auxiliar</h1><p>Actualizar la informacion porfavor.</p>', newUser.email );
      req.session.userId = newUser._id;
      res.status(200).send({stat: true});
    } )
  }

}

module.exports = new RouterFunctions;
