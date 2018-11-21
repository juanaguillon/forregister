/**
 * Function generaly for back-end developing.
 * This file will be use to call generally functions in the app.
 */

Object.prototype.newBucle = function( callback ){
  for ( var i in this ){
    if ( this.hasOwnProperty(i) ){
      callback();
    }
  }
}
