var registerMetadata = new register_metadata('register_form');

registerMetadata.setHeaders({
  header: {
    "Content-Type":"application/json;charset=UTF-8"
  },
  method:"POST"
})

registerMetadata.submit('/register');