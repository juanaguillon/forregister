"use strict";
var formProcess = function( ){  

  this.process = new process();

  /** */

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
}