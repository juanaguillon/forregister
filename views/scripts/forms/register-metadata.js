var $ = jQuery;

var register_metadata = function(  ){

  // Form Process class 
  this.formProcess = new formProcess();
  this.name = $('#name_field')
  this.lname = $('#lastname_field')
  this.email = $('#email_field')
  this.pass = $('#pass_field')
  this.rpass = $('#rpass_field')

  /**
   * Check the same password.
   * @return {Boolean}
   */
  this.samePassword = function( ){
    try {
      if (this.formProcess.sameTwoFields(this.pass.val(), this.rpass.val()) ){
        return true;
      }      
    } catch (e) {
      console.log(e)
    }
  }
}