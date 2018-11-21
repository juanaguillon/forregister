Object.prototype.newBucle = function( callback ){
  for ( var i in this ){
    if ( this.hasOwnProperty(i) ){
      callback();
    }
  }
}
