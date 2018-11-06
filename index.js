// Import the view paths
const routes = require('./views-paths');
const reload = require('reload');

/**
 * The port to listen the application.
 */
routes.app.listen(routes.app.get('port'), function(){
  console.log(`Conectado en puerto localhost: ${routes.app.get('port')}`);
});
reload( routes.app );
