// Import the view paths
const routes = require('./views-paths');

/**
 * The port to listen the application.
 */
routes.app.listen(routes.app.get('port'), function(){
  console.log(`Conectado en puerto localhost: ${routes.app.get('port')}`);
});

