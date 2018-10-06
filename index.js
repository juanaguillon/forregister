const express = require('express');
const parser = require('body-parser');
const app = express();
const urlencoded = parser.urlencoded({extended: false});
const json = parser.json();

app.use( urlencoded )
app.use( json );

app.set('port', process.env.PORT || 3000 );
app.listen( app.get('port'), function(){
  console.log(`Conectado en puerto localhost: ${app.get('port')}`);
})