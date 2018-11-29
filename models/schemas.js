// Import the functions.
// Only require ( no save in var ), 'cause need import the prototypes in the file 

const connection = require('./connect');

const schemas = {};

/**
 * Create a new schema. 
 * @param {String} name The unique id for the schema, to call it.
 * @param {Object} props The propietis to be used in the schema
 */
function setSchema(name, props) {

  if ( ! schemas.hasOwnProperty(name) ){
    schemas[name] = new connection.Schema( props );
  }else{
    throw `El id ${name} en schemas no está disponible, intente otro.`;
  }

}

setSchema("registerUser", {
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

module.exports ={
  schemas: schemas,
  connection: connection
};

