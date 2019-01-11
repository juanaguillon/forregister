// Get the process functions.
const process = require('../backprocess');

/**
 * This file will be used for many functions about the http request | response & errors in the application.
 * The req params refer to Request, res to Responds and err to Errors.
 * Every req, res, err params is requiered in functions.
 */
let requestHttp = {}

/**
 * Get a query params by url ( /any-url?variable=valueVariable )
 * Passed by string as only or array for get multiples querys.
 * @param {Request} req The HTTP Request
 * @param {String|Array} querys Query params by GET HTTP Methot that want to obtain.
 */
requestHttp.getQuery = function( req, querys ){
  if ( querys.constructor == Array ){
    let fullQuerys = {} ;
    for ( let i=0; i < querys.length; i++ ){
      // Make loop of every desirable query params

      if ( req.query[querys[i]] ){
        // Check if exists the current query param

        fullQuerys[ querys[i] ] = req.query[ querys[ i ]];
      }
    }

    return Object.keys(fullQuerys).length > 0 ? true : false ;

  }else if ( querys.constructor == String ){
    // If the desirable query is only param.

    return req.query[ querys ] || false;
  }
}

module.exports = requestHttp;