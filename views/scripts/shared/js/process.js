"use strict"
var process = function( ){

  Object.prototype.newBucle = function( object, callback ){
    for ( key in object ){
      if ( object.hasOwnProperty( key ) ){
        callback();
      }
    }
  }  

  this.secureTypes = function (types) {
    if (types.constructor == Object) {

      Object.newBucle( types, function( ){
        
      })

    } else {
      throw "No es posible asegurar tipos con un parámetro diferente a Object";
    }
  }
  
} 