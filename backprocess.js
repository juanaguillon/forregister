const fs = require('fs');
const mailer = require('nodemailer');

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
   * Send a email with nodemailer.
   * This function will gone to show a back-console if was send sussefully and show the url to visit the email.
   * @param {String} html HTML Template taht will be send to receiver.
   * 
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

      console.log('Se ha enviado el email correctamente');
      console.log('Ver URL: %s', mailer.getTestMessageUrl(info));
      res.status(200).send({ stat: true });
    })
  }

}


module.exports = new process();