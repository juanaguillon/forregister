var registerMetadata = new register_metadata('register_form');
registerMetadata.url = '/register';

registerMetadata.setHeaders({
  headers: {
    "Content-Type":"application/json;charset=UTF-8"
  },
  method:"POST"
})

registerMetadata.form.addEventListener( 'submit', function( e ){
  e.preventDefault();
  registerMetadata.preSubmit(); 
})

