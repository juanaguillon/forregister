"use strict";
var formProcess = function( ){  

  this.process = new process();

  /**
   * Check if two fields is the same value
   * @param {String} label1 First value
   * @param {String} label2 Second value value
   */
  this.sameTwoFields = function( label1, label2 ){
   
    
    var values = this.process.secureTypes( { 
      [String]: [label1, label2 ]
    } );
    if ( values[0] == values[1] ){
      
      return true;
    }else{
      throw "Los valores no son idénticos."
    }
    
  }  

  /**
   * Check the email field.
   * @param {String} email The email that will be checked
   */
  this.checkEmail = function( email ){
    return this.process.checkRegex( email, /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ );
  }

  this.createError = function( message ){
    return this.process.createErrorMessage( message );
  }

  this.createSuccess = function( message ){
    return this.process.createSuccessMessage(message);
  }

  this.requiredAll = function( obj ){
    if ( obj.constructor == Object ){
      return obj.requiredAll();

    }
  }

  
}