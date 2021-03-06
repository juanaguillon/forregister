// In This file, called functions refered to HTTP methods.

const model = require('./models/schemas');
const process = require('./backprocess');
const requestHttp = require('./controller/request-http');

/**
 * The router functions will be used for handlers ( Functions in specific URLs ), and executed when the user entry to a url.
 * Each function method, has a comment with the relative Path ( RELPATH ) to application, giving information about when it execute.
 */
class RouterFunctions {

  /**
   * RENDERS
   * Every render*() functions is used for create a render beetween the routes and the views engines.
   * This section declare all renders that will be used in the application
   */

  // RELPATH: /register
  // Render template for register a user.
  renderRegisterUser( req, res ){
      res.render( 'register', {
        title: "Registro de Usuario" ,
        userId : process.getUserId( req )
      } );
  }

  // RELPATH: /register-sucess
  // Render template for inform to user about the success register.
  // Only can access if exists the session
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

  // RELPATH: /login
  // Render template for login user.
  // This only can be acces without a session.
  // The rendered template form for login process.
  renderLogin( req, res ){

    if ( process.isSession( req ) ){
      return res.redirect('/private')
    }

    res.render('login', {title:'Ingresar Usuario'});
  }

  /**
   * POST METHODS
   * This section giving information about the all post methods in the applications.
   */

  // RELPATH: /register-form ( POST )
  // Post method for register a user. Used in render register with ajax request.
  registerUser( req, res ){
    let userSchema = model.schemas.registerUser.pre('save', function (next) {


      let truePass = process.verifyHash(req.body['r-password'], newUser.password);
      let trueEmail = process.checkEmail(newUser.email)
      
      if ( truePass && trueEmail ) {
        let existingUser = user.findOne({ email: newUser.email }, "email");
        existingUser.exec(function (err, doc) {

          if (err) throw "Error en el servidor al crear usuario, error:" + err;

          if (doc !== null) {
            res.json({stat: false,message:'Correo existe actualmente'});
          }else{
            next();
          }
        })

      }
    })

    // Create model for save user.
    const user = model.connection.model("user", userSchema );
    let porpUser = {
      name: req.body.name,
      email: req.body.email,
      lastname: req.body.lastname,
      password: process.createHash(req.body.password),
      verification_code: Math.floor(Math.random() * 99999999999) + 10000000000,
      status: false
    }
    // Create register for current user
    const newUser = new user(porpUser)
    
    
      // Save user to db.
    newUser.save( err => {
      if( err ) throw "Error al guardar el usuario, error:" + err;
      // Send confirmation email to email registrated.
      process.sendEmail( process.getTemplate("register.email",
        {
          "verify": newUser.verification_code,
          "userId": newUser._id
        }
      ) , newUser.email );

      req.session.userId = newUser._id;
      req.session.email = newUser.email;
      req.session.status = newUser.status;

      
      return res.send({ stat: true }).end();
    } );


  }

  // RELPATH /login ( POST )
  // The post method for check the login user.
  loginUser(req, res) {

    if ( process.isSession( req ) ){
      process.routerExit("Ya existe una sesión en curso actualmente.", res, 400);
    }else if ( ! req.body.email || ! req.body.password ){
      // If not send a email | password to search in query
      if (!req.body.email) {
        return process.routerExit("No se enviado ningun email a buscar", res)
      }else{
        return process.routerExit("No se enviado ninguna constraseña a buscar", res)
      }

    }

    // Select the model to search the exisiting user.
    let existingUser = model.connection.model("user", model.schemas.registerUser );
    existingUser.findOne(
      {
        email: req.body.email
      },
      function( err, document ){

        if ( err ){
          return process.routerExit("Error de servidor. Intente nuevamente", res, 500 )
        }

        if ( document != null ){
          if ( ! document.status ) return process.routerExit('Debes verificar tu cuenta primero.', res)
          let password = req.body.password;

          if ( process.verifyHash(password, document.password) ){
            // process.recordSession( req, document._id );
            req.session.userId = document._id;
            res.redirect('/private');
          }else{
            return process.routerExit('Usuario o contraseña incorrecta', res)
          }
        }else{
          return process.routerExit('Usuario o contraseña incorrecta', res)
        }
      }
    )

    return;
  }

  /**
   * GET METHODS
   * This section giving information about the all get methods in the application.
   */

  // RELPATH: /confirm-email ( GET )
  // Get method for check if the URL sending to email registred is correct and valid.
  confirmEmail ( req, res ){
    if ( ! requestHttp.getQuery(req, ["unique","verify"]) ){
      res.redirect('/register');
      return;
    }

    let searchVerify = model.connection.model( "user", model.schemas.registerUser );

    searchVerify.findById(
      requestHttp.getQuery( req, "unique"),
      function(err, user){
        if ( err ) throw "Error al verificar el email en la base de datos, error:" + err;

        if ( user.verification_code == requestHttp.getQuery( req, 'verify') && ! user.status ){
          user.status = true;
          user.save( function( ){
            res.redirect('/login?ref=registrated');
          } );
        }else{
          res.redirect('/register');
          return;
        }
      }
    )
    return;
  }

  // RELPATH: /destroy-session
  // Destroy current session
  sessionDestroy( req, res ){
    req.session.destroy();
    res.redirect('/register');
  }


}

module.exports = new RouterFunctions;
