const pug = require('pug');
const mailer = require('nodemailer');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

class process{

  /**
  * Check if the value is correct with exec format
  * @param {String} value The value to will be checked.
  * @param {String} regex The regex format that will be use to check the value.  
  */
  checkRegex(value, regex) {
    return regex.test(value);
  }

  /**
 * Check the email field based in regex.
 * @param {String} value The field to will be process waiting a email value.
 * @return {Boolean}
 */
  checkEmail(value) {
    return this.checkRegex(value, /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$/);
  }

  /**
   * 
   * Get a template file based in pug engine file.
   * You need select a pug file in the views/templates folder.
   * @param {String} template The template to get in view template folder
   * @param {String} options The options passed to template if have variables.
   */
  getTemplate( template, options ={} ){
    return pug.renderFile( "./views/templates/" + template + '.pug', options );
  }

  /**
   * Send a email with nodemailer.
   * This function will gone to show a back-console if was send sussefully and show the url to visit the email.
   * @param {String} html HTML Template taht will be send to receiver.
   * @param {String} to Receptor email.
   * @param {String} from Transmitter email
   */
  sendEmail(html, to, from = "lg2a6h2dne757hrb@ethereal.email" ){
    let transport = mailer.createTransport({
      host: "smtp.ethereal.email",
      secure: false,
      port: 587,
      auth: {
        user: "lg2a6h2dne757hrb@ethereal.email",
        pass: "bWtszf1nDn8pkmdDzq"
      }
    })

    let mailOptions = {
      from: from ,
      to: to,
      subject: 'Verificación correo electrónico',
      html: html
    }
    transport.sendMail(mailOptions, (errorMail, info) => {
      if (errorMail) throw "Error al enviar mail " + errorMail;

      res.status(200).send({ stat: true });
    })
  }

  /**
   * Check if exists the session actually. Pass the Req param for search the session.
   * @param {Request} req The HTTP request
   * @type Boolean
   * @return True if exists the session
   */
  isSession( req ){
    if ( req.session.userId ) return true;
  }

  /**
   * Start a session. If exists a session, non-returned.
   * @param {Request} req The HTTP request 
   * @param {String} userId The user id to start the session.
   */
  recordSession( req, userId ){
    if ( this.isSession( req ) ) return;    
    req.session.userId = userId;
  }

  /**
   * NOTE: Call this method only if exists the session. If not exists session, throw error.
   * Get the userId of current session
   * @param {Request} req The HTTP Request
   * @return Current User ID.
   */  
  getUserId( req ){
    return req.session.userId;
  }

  /**
   * Encrypt HASH64 code with JWT ( Json Web Tokens)
   * @param {String|Object|Array|Number} payload The data will be encrypted
   */
  createToken( payload ){
    return jwt.encode( payload, 'SecretCodeJWT#' );
  }

  /**
   * Decode a JSON token. 
   * @param {JSONToken} token The token to decode
   */
  decodeToken( token ){
    return jwt.decode( token );
  }
  
  /**
   * Create a hash ( password )
   * @param {String} pass A string to create the hash with it.
   * @return {String} The password encoding with a hash
   */
  createHash(pass){
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync( pass, salt );
  }

  /**
   * Verify or compare a password with a hash.
   * @param {String} pass The password to check if is the same as hash
   * @param {BcryptHash} hash The hash to use with the password
   * @return {Boolean} 
   */
  verifyHash ( pass, hash ){
    return bcrypt.compareSync( pass, hash );
  }

  /**
   * In so many cases, we need send a message to client when is necessary.
   * This function allow to send the message to client easly.
   * 
   * @param {String} message The message that will be send to user
   * @param {Response} res The response object in the actually router
   * @param {Number} status HTTP status to send.
   */
  routerExit( message, res, status = 409 ){
    return res.status(status).send( {
      stat: false,
      message:message
    } ).end()
  }

}


module.exports = new process();