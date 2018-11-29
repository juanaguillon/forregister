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

Object.prototype.requiredAll = function(  ){
  for( var i in this ){

    if (this.hasOwnProperty(i) && this[i] == '') {
      return false;
    }
  }
  return true;
}

String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
}



getHost = function( ){
  return window.href.host;
}

sendLocation = function( url ){
  window.href.location = `${getHost / url}`;
}

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
secureTypes = function ( types ) {
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
 * Check if the value is correct with exec format
 * @param {String} value The value to will be checked.
 * @param {String} regex The regex format that will be use to check the value.  
 */
checkRegex = function (value, regex) {
  return regex.test(value);
}


/**
 * Create a HTML structure
 * 
 * @param {Object} attrs: Attributes of element, send key as attr, and val as value attr. 
 * @param {String} element: Default is Div
 */
createHtml = function (attrs, doc, element = "div") {

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
createMessage = function( type, message ){
  var classes = "ui message " + type;
  return createHtml({ class: classes }, message);
}

/**
 * Create a error message
 * @param {String} message Message that will be shown the error
 * @see createMessage()
 */
createErrorMessage = function( message ){
  return createMessage('error', message )
}

/**
 * Create a success message
 * @param {String} message Message that will be shown the success
 * @see createMessage()
 */
createSuccessMessage = function( message ){
  return createMessage('success',  message )
}

/**
 * Create a information message
 * @param {String} message Message that will be shown the information
 */
createInfoMessage = function( message ){
  return createMessage('info', message)
}

/**
 * Create a warning message
 * @param {String} message Message that will be shown the warning
 */
createWarningMessage = function (message) {
  return createMessage('warning', message)
}

/**
 * Create a basic message
 * @param {String} message Message that will be shown the basic
 */
createBasicMessage = function (message) {
  return createMessage('', message)
}





