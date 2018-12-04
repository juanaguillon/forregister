const fs = require('fs');
class process{

  /**
  * Check if the value is correct with exec format
  * @param {String} value The value to will be checked.
  * @param {String} regex The regex format that will be use to check the value.  
  */
  checkRegex(value, regex) {
    return regex.test(value);
  }

  /**
 * Check the email field based in regex.
 * @param {String} value The field to will be process waiting a email value.
 * @return {Boolean}
 */
  checkEmail(value) {
    return this.checkRegex(value, /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]+$/);
  }

  /**
   * Get a template by a string.
   * @param {String} template A file to read
   */
  getTemplate( template ){
    return fs.readFileSync('./views/templates/' + template ).toString() 
  
  }

}


module.exports = new process();