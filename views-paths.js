const routes = require('./controller/routes'); 

// Set the source views as publics paths
// Remembering that, the routes is the module routes exporting.

// View Engine
routes.app.use('/publics', routes.express.static('./views'));

// Scripts JS 
routes.app.use('/scripts', routes.express.static('./views/scripts') );

// Css Folders
routes.app.use('/publics/semantic/', routes.express.static('./semantic'));


module.exports = routes;