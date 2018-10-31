const routes = require('./controller/routes'); 

// Set the source views as publics paths
// Remembering that, the routes is the module routes exporting.
routes.app.use('/publics', routes.express.static( './views' ) );
routes.app.use('/publics/semantic/', routes.express.static( './semantic' ) );

/**
 * The port to listen the application.
 */
routes.app.listen(routes.app.get('port'), function(){
  console.log(`Conectado en puerto localhost: ${routes.app.get('port')}`);
});

