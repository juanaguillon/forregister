
var sub = document.getElementById('register_form');

sub.addEventListener('submit', function( e ){
  var registerMetadata = new register_metadata();
  
  e.preventDefault();
  if ( ! registerMetadata.samePassword() ) {
    $('div.form-container').before(
      registerMetadata.formProcess.createError('Las contraseñas no coinciden')
    );
  }else{

    var data = new FormData(this);
    var obJson = {};

    data.forEach(function (val, key) {
      obJson[key] = val;
    })

    fetch('/register', {
      body: JSON.stringify(obJson),
      method: 'POST',
      headers: {
        "Content-type": "application/json;charset=UTF-8"
      }
    })
      .then(function (response) {
        return response.json()
      })
      .then(res => {
        
        if (res.stat == true) {
          alert('yes. register')
          $('.form-container').before(
            registerMetadata.formProcess.createSuccess('Se creado el registro correctamente') 
          );
        } else {
          console.log('nope')
        }

      })

    }
  })
  