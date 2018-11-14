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

Object.prototype.large = function (objToDeterminate) {
  var lenghting = 0;
  this.newBucle(objToDeterminate, function () {
    lenghting++;
  });

  return lenghting;
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
   * @param {Object} attrs: Attributes of element, send key as attr, and val as value attr. 
   * @param {String} element: Default is Div
   */
  this.createHtml = function (attrs, doc, element = "div") {

    var attributes = []
    Object.newBucle(attrs, function (key, obj) {
      attributes.push(key + "='" + obj[key] + "'");
    })

    var structure = '<' + element + ' ' + attributes.join(' ') + '>';
    structure += doc;
    structure += '</' + element + '>';
    return structure;
  }

  // Messages Section --


  /**
   * Create a message field.
   * @param {String} type Type of error be shown. If you declare this parameter as non-defined message type, it be shown as default.
   * @param {String} message Message will be thrown.
   * @see {Link} https://semantic-ui.com/collections/message.html
   * If you want send more classes, you can defined more class in the first Parameter.
   * EXMPLE
   * process.createMessage('error compact inverted', 'This will be the error message' )
   */
  this.createMessage = function( type, message ){
    var classes = "ui message " + type;
    return this.createHtml({ class: classes }, message);
  }

  /**
   * Create a error message
   * @param {String} message Message that will be shown the error
   * @see createMessage()
   */
  this.createErrorMessage = function( message ){
    return this.createMessage('error', message )
  }

  /**
   * Create a success message
   * @param {String} message Message that will be shown the success
   * @see createMessage()
   */
  this.createSuccessMessage = function( message ){
    return this.createMessage('success',  message )
  }

  /**
   * Create a information message
   * @param {String} message Message that will be shown the information
   */
  this.createInfoMessage = function( message ){
    return this.createMessage('info', message)
  }

  /**
   * Create a warning message
   * @param {String} message Message that will be shown the warning
   */
  this.createWarningMessage = function (message) {
    return this.createMessage('warning', message)
  }

  /**
   * Create a basic message
   * @param {String} message Message that will be shown the basic
   */
  this.createBasicMessage = function (message) {
    return this.createMessage('', message)
  }

  /**
   * Check if the value is correct with exec format
   * @param {String} value The value to will be checked.
   * @param {String} regex The regex format that will be use to check the value.  
   */   
  this.checkRegex = function( value, regex ){


  }

} 

