var registerMetadata = new register_metadata('register_form');

registerMetadata.setHeaders({
  headers: {
    "Content-Type":"application/json;charset=UTF-8"
  },
  method:"POST"
})

registerMetadata.submit('/register');