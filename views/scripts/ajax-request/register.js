var sub = document.getElementById('register_form');

sub.addEventListener('submit', function( e ){
  e.preventDefault();

  var data = new FormData( this );
  var obJson = {};

  data.forEach( function( val, key ) {
    obJson[ key ] = val;
  })

  fetch('/register', {
    body: JSON.stringify( obJson ),
    method: 'POST',
    headers: {
      "Content-type": "application/json;charset=UTF-8"
    }
  } )
  .then( function( response ){
    return response.json()    
  })
  .then( res => {
    if( res.stat == true ){
      jQuery('.form-container').before('<div class="ui success message mini"><div class="header">Registro Completo</div><p>Se ha creado el registro correctamente</p></div>');
    }else{
      console.log('nope')
    }
    
  } )

})