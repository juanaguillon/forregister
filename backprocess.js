let process = {};

/**
  * Check if the value is correct with exec format
  * @param {String} value The value to will be checked.
  * @param {String} regex The regex format that will be use to check the value.  
  */
process.prototype.checkRegex = function( value, regex ){
  return regex.test(value);
}

  
/**
 * Check the email field based in regex.
 * @param {String} value The field to will be process waiting a email value.
 * @return {Boolean}
 */
process.prototype.checkEmail = function( value ){
  return this.checkRegex.test(value);
}