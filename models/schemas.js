// Import the functions.
// Only require ( no save in var ), 'cause need import the prototypes in the file 
require('../functions');

const schemas = {};
function setSchema(name, props) {

  if ( ! schemas.hasOwnProperty(name) ){
    schemas[name] = props;
  }else{
    throw `El id ${name} en schemas no está disponible, intente otro.`;
  }

}

setSchema(registerUser, {
  name: String,
  lastname: String,
  status: Boolean,
  verification_code: String,
  password: String,
  email: {
    type: String,
    match: /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$/
  },
  registerAt: {
    type: Date,
    default: Date.now
  }
} );

module.exports = schemas;

