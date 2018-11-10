"use strict"
var process = function( ){

  /**
   * Make a bucle for a object ( Key : Value)
   * The callback parameter passed two parametes. First parameter is "key" , and second "value" parameter for get the values returned in loop.
   */

  Object.prototype.newBucle = function( object, callback ){
    for ( var key in object ){
      if ( object.hasOwnProperty( key ) ){
        callback( key, object );
      }
    }
  }  

  /**
   * Makes secure a types of parameters.
   * If not is secure, lose the value of value in types ( parameter ) json, and replace by 'Secure Failed' string
   * For send a types parameter, you need send json structure like that:
   * var a = {
   *  [String] // The type requiered in the value... Necessary the brackets.
   *  value // May is passed like variable
   * }
   */
  this.secureTypes = function ( types ) {
    if (types.constructor == Object) {
      var secureType = {};
      Object.newBucle( types, function( key, obj ){
        if ( obj[key].constructor == key  ){
          secureType.push( obj[key] )
        }else{
          secureType.push(obj[key] = 'Secure Failed' )
        }
      })

    } else {
      throw "No es posible asegurar tipos con un parámetro diferente a Object";
    }
  }
  
} 