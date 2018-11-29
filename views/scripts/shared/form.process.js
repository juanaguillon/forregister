"use strict";
var formProcess = function( ){   

  /**
   * Check if two fields is the same value
   * @param {String} label1 First value
   * @param {String} label2 Second value value
   */
  this.sameTwoFields = function( label1, label2 ){
   
    
    var values = secureTypes( { 
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
    return checkRegex( email, /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$/ );
  }

  this.createError = function( message ){
    return createErrorMessage( message );
  }

  this.createSuccess = function( message ){
    return createSuccessMessage(message);
  }

  this.requiredAll = function( obj ){
    if ( obj.constructor == Object ){
      return obj.requiredAll();

    }
  }

  
}