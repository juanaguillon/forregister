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

  this.createError = function( message ){
    return this.process.createErrorMessage( message );
  }

  this.createSuccess = function( message ){
    return this.process.createSuccessMessage(message);
  }

  
}