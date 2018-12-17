// In This file, called functions refered to HTTP methods.

const model = require('./models/schemas');
const process = require('./backprocess');
const requestHttp = require('./controller/request-http');


class RouterFunctions {

  renderRegisterUser( req, res ){
      res.render( 'register', {
        title: "Registro de Usuario" , 
        userId : process.getUserId( req )
      } );
  }

  renderRegisterSuccess ( req, res ){
    if ( req.session.userId && ! req.session.status ){
      res.render('message', { 
        // Sending a template to render in message.pug view
        template: process.getTemplate('register-success.message', {
          email: req.session.email
        }),
        title: "Verificación de registro",
      });

    }else{
      res.redirect('/register');
    }
  }

  registerUser( req, res ){
    model.schemas.registerUser.pre('validate',function( next ){
      if (this.password == req.body['r-password'] && process.checkEmail(this.email) ){

        var query = user.findOne({ email: this.email }, "email")
        query.exec( function(err, doc){
          if ( err ) throw "Error en el servidor al crear usuario, error:" + err;
          if (doc != null) {
            res.status(409).send({ stat: false, message: "Email ingresado no disponible" });
          } else {
            next()
          }
        } )
      }
    });
    const user = model.connection.model("user", model.schemas.registerUser );
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
      
      process.sendEmail( process.getTemplate("register.email",
        {
          "verify": newUser.verification_code,
          "userId": newUser._id
        }
      ) , newUser.email );

      req.session.userId = newUser._id;
      req.session.email = newUser.email;
      req.session.status = newUser.status;
      res.status(200).send({stat: true});
    } )
  }

  confirmEmail ( req, res ){
    if (!req.query.verify) res.redirect('/register');
    let searchVerify = model.connection.model( "user", model.schemas.registerUser );

    searchVerify.findById(
      requestHttp.getQuery( req, "unique"),
      function(err, user){
        if ( err ) throw "Error al verificar el email en la base de datos, error:" + err;

        if ( user.verification_code == requestHttp.getQuery( req, 'verify') ){
          user.status = true;
          user.save( function( ){
            res.redirect('/login');
          } );
        }
      }
    )
    
  }

  closeSession( req, res ){
    req.session.destroy();
    res.redirect('/register');
  }

}

module.exports = new RouterFunctions;
