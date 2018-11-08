var $ = jQuery;

var register_metadata = function(  ){
  
  this.name = $('#name_field')
  this.lname = $('#lastname_field')
  this.email = $('#email_field')
  this.pass = $('#pass_field')
  this.rpass = $('#rpass_field')

  this.samePassword = function( ){
    if ( this.pas === this.rpass ){
      
    }
  }
}