const express = require('express');
const parser = require('body-parser');
const app = express();
const urlencoded = parser.urlencoded({extended: false});
const json = parser.json();

app.use( urlencoded );
app.use( json );

app.set('views','./views');
app.set('view engine','pug');

app.set('port', process.env.PORT || 3000 );
app.use('/public', express.static( __dirname + '/views/scripts' ) ) ;
app.get('/pugger', ( req, res ) => {
  // Enviar un titulo a la plantilla index de views.
  res.render('index',{title:'Ho mamn'})
})
app.listen( app.get('port'), function(){
  console.log(`Conectado en puerto localhost: ${app.get('port')}`);
});

