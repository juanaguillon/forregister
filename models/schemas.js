const mongod = require('./connect');

/**
 * Define schemas, define for a pre-formated query in database
 */
class Schemas {

  // All defined schemas
  constructor(){
    this.theProperties();
  }

  /**
   * Set every properties in the class.
   * Used for best view in constructor class
   */
  theProperties( ) {
    
    this.allSchemas = {
      userlogin: {
        name: String,
        password: String,
        passconfirm: String,
        registerAt: {
          type: Date, 
          default: Date.now },
        email: { 
          type: String,
          match: /^[a-zA-Z0-9_\.\-]+@(gmail|outlook|hotmail|yahoo)+\.[a-zA-Z0-9]+$/ }
      }
    }

    this.models = {
      "user": mongod.model('user', this.getSchema('userlogin') )
    }
  }

  /**
   * Get dynamic model for create a register in DB.
   * @param {string} modelName -Pass for the name of model
   */
  getModel( modelName ){    
    return this.models[ modelName ]
  }

  /**
   * Return a schema class.
   * The schemas predefined are at the properties method.
   * @param {string} handle -Unique string for return the schema
   */
  getSchema( handle ){
    return new mongod.Schema( this.allSchemas[handle] );
  }
}

module.exports = new Schemas();
