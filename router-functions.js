/**
 * In This file, called functions refered to HTTP methods.
 */

const model = require('./models/schemas');
const process = require('./backprocess');


class RouterFunctions {

  renderRegisterUser( req, res ){
    let userId = req.session.userId || false;
    res.render( 'register', {title: "Registro de Usuario" , userId : userId  } )
  }

  renderRegisterSuccess ( req, res ){
    if ( req.session.userId && ! req.session.status ){
      res.render('register-success', { title: "Verificación de registro", email: req.session.email});

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
      
      process.sendEmail(process.getTemplate("register.email",
        {
          "verify": newUser.verification_code
        }
      ) , newUser.email );

      req.session.userId = newUser._id;
      req.session.email = newUser.email;
      req.session.status = newUser.status;
      res.status(200).send({stat: true});
    } )
  }

  closeSession( req, res ){
    req.session.destroy();
    res.redirect('/register');
  }

}

module.exports = new RouterFunctions;
