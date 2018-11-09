"use strict";
var formProcess = function( ){  

  this.sameTwoFields = function( label1, label2 ){
    if ( typeof label1 == 'string' && typeof label2 == "string" ){
      if ( label1 == label2  ){
        return true;
      }else{
        throw 
      }
    }

    return false;
  }  
}