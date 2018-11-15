var $ = jQuery;

var register_metadata = function( form ){

  // Form Process class 
  this.formProcess = new formProcess();

  // Select the form by jquery object
  this.form = document.getElementById( form );  

  // The flelds of form selected.
  this.fields = {};

  // headers property to send ajax process.
  this.headers = {}; 

  this.url = '';

 // Set the values of fields.
  this.setFields = function( ){
    var formData = new FormData(this.form)
    formData.forEach( (val, key) => {
      this.fields[key] = val;
    } )
  }
  

  /**
   * Declare the headers
   * The declares headers be used to fetch ES6 function to connect HTTP request with server.
   * @param {Object} headers The headers that will bassed to self headers property.
   * */  
  this.setHeaders = function (headers) {
    this.headers = headers;
  }  

  /**
   * Check the if is the same password same password.
   * @return {Boolean}
   */
  this.samePassword = function () {
    try {
      if (this.formProcess.sameTwoFields(this.fields.password, this.fields["r-password"])) {
        return true;
      }
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Check the email field.
   * If you want check a email, send string as parameter.
   * If email is empty, the function get fields.email, that is declared as name attribute in form
   * @default email Empty string. 
   */
  this.checkEmail = function( email = '' ){

    var emailChecked = ( email == '' ) ? email : this.fields.email;
    return this.formProcess.checkEmail( emailChecked );
  }

  /**
   * Get a specific field.
   * You cannot get a field if it´s not defined. The fields is defined by function set fields.
   * Set fields function requiered submit the form.
   * @param {String} field The property field you can get.
   * @returns {Boolean | String } If not exists, return false.
   */
  this.getField = function( field ){
    if ( this.fields.hasOwnProperty( field ) ){
      return this.fields[field];
    }
    return false;
  }

  /**
   * The process that will be output before send the form to DB
   * @return { DOMMessage | Exec } 
   */
  this.preSubmit = function(){
    var beforeFormDisplay = jQuery(this.form);
    beforeFormDisplay.prev().remove();
    this.setFields();
    this.headers['body'] = JSON.stringify(this.fields);
    console.log( this.fields.constructor )
    console.log( this.fields);
    if( this.formProcess.requiredAll( this.fields ) ){
      beforeFormDisplay.before(this.formProcess.createError('Todos los campos son necesarios'))
    }else if ( ! this.samePassword() ) {
      beforeFormDisplay.before(this.formProcess.createError('Las contraseñas no coinciden.'))      
    } else if ( this.checkEmail( ) ){
      beforeFormDisplay.before( this.formProcess.createError('El email ingresado no es aceptado.'))
    } else {
      this.fields.name = this.fields.name.capitalize();
      this.fields.lastname = this.fields.lastname.capitalize();
      this.ajaxSubmit();
    }
    
  }

  /**
   * The submit function.
   * Only call this function when you have all form secure. With your fields are checked for send secure data.
   * Then, if you need check the password, or the passwords should be same, or an email should be with specific regex.
   * @param {String} url The url 
   */
  this.ajaxSubmit = function( ){    
   
    fetch( this.url, this.headers )
    .then( response => response.json() )
    .then( res => {
      if ( res.stat ){
        $(this.form).before( this.formProcess.createSuccess('Se ha creado el registro correctamente')
        );
      }else{
        $(this.form).before(
          this.formProcess.createError('Ha ocurrido un problema con el servidor')
        );
      }
    })
  } 

  
}