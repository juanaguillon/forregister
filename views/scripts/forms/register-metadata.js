var $ = jQuery;

var register_metadata = function( form ){

  // Form Process class 
  this.formProcess = new formProcess();

  // Select the form by jquery object
  this.form = $(form);

  // The flelds of form selected.
  this.fields = {};

  // headers property to send ajax process.
  this.headers = {}; 

  // Class the function to set the values.
  this.setFields();

  // Set the values of fields.
  this.setFields = function( ){
    this.form.forEach( (val, key) => {
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

  this.submit = function(){
    if ( ! this.samePassword() ){
      this.formProcess.createError()
    }
  }

  /**
   * Check the if is the same password same password.
   * @return {Boolean}
   */
  this.samePassword = function( ){
    try {
      if (this.formProcess.sameTwoFields(this.fields.pass.val(), this.fields.rpass.val()) ){
        return true;
      }      
    } catch (e) {
      console.log(e)
    }
  }

  
}