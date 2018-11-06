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
    console.log(res);
  } )

})