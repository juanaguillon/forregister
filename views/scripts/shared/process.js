"use strict"
/**
  * Make a bucle for a object ( Key : Value)
  * The callback parameter passed two parametes. First parameter is "key" , and second "value" parameter for get the values returned in loop.
  */

Object.prototype.newBucle = function (object, callback) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      callback(key, object);
    }
  }
} 


var process = function( ){ 


  /**
   * Makes secure a types of parameters.
   * If not is secure, lose the value of value in types ( parameter ) json, and replace by 'Secure Failed' string
   * For send a types parameter, you need send json structure like that:
   * var a = {
   *  [String] // The type requiered in the value... Necessary the brackets.
   *  value // May is passed like variable
   * }
   * @param types Object
   */
  this.secureTypes = function ( types ) {
    if (types.constructor == Object) {
      var secureType = [];

      Object.newBucle( types, function( key, obj ){
        console.log( obj )
        if ( obj[ key ].constructor == Array ){
          var typesSecuring = obj[key];
          for (var i = 0; i < typesSecuring.length; i++) {
            if( typesSecuring[i].constructor == key ){
              secureType.push( typesSecuring[i] )
            }else{
              throw "Los valores enviados no son esperados"
            }
          }
        }else if ( obj[key ].constructor == String){
          if (typesSecuring.constructor == key) {
            secureType.push(typesSecuring[i])
          } else {
            throw "Los valores enviados no son esperados"
          }
        }
      })
      return secureType;

    } else {
      throw "No es posible asegurar tipos con un parámetro diferente a Object";
    }
  }


  /**
   * Create a HTML structure
   * 
   * @param {object} attrs: Attributes of element, send key as attr, and val as value attr. 
   * @param {string} element: Default is Div
   */
  this.createHtml = function (attrs, doc, element = "div") {

    var attrs = []
    Object.newBucle(attrs, function (key, obj) {
      attrs.push(key + "='" + obj[key] + "'");
    })

    var structure = '<' + element + attrs.join(' ') + '>';
    structure += doc;
    structure += '</' + element + '>';
    return structure;
  }
  
} 