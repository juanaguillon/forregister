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

  this.submit = function( url ){

    
    var currentClass = this;
    this.form.addEventListener('submit', function(e) {
      e.preventDefault();

      currentClass.setFields();
      currentClass.headers['body'] = JSON.stringify( currentClass.fields );
      if ( ! currentClass.samePassword() ){
        $( currentClass.form ).before(
          currentClass.formProcess.createError('Las contraseñas no coinciden')
        )
      }else{
        fetch( url, currentClass.headers )
        .then( response => response.json() )
        .then( res => {
          if ( res.stat ){
           $(currentClass.form).before( currentClass.formProcess.createSuccess('Se ha creado el registro correctamente')
           );
          }else{
            $(currentClass.form).before(
              currentClass.formProcess.createError('Ha ocurrido un problema con el servidor')
            );
          }
        })
      }

    })
  }

  

  
}