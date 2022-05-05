console.log(window.location.hostname.includes('localhost'))
const miFormulario = document.querySelector('form');

const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

miFormulario.addEventListener('submit', e => {
  e.preventDefault();
  const formData = {}

  for( let el of miFormulario.elements){
    if( el.name.length > 0){
      formData[el.name] = el.value
    }
  }

  console.log(formData);
  fetch( url + 'login', {
    method:'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type':'application/json'}
  })
  .then( res => res.json() )
  .then( data => {
    console.log(data)
    let { msg, token } = data;
    if( msg ){
      return console.error(msg);
    }

    localStorage.setItem('token', token);
  }).catch( err => {
    console.log(err)
  })
})

// function handleCredentialResponse(response) {
function onSignIn(googleUser){
  //Google token :ID_TOKEN
  //console.log('id_token',response.credential)

  // let profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  let { id_token } = googleUser.getAuthResponse();
  const body = { id_token };

  fetch('http://localhost:8080/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(({ user, token }) => {
    localStorage.setItem('email', user.email)
    localStorage.setItem('token', token)
    console.log('our server response: ', token)
  })
  .catch(console.warn)
}

  function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
  }

// const button = document.getElementById('#google_signout');
// button.onclick = () => {
//   google.accounts.id.disableAutoSelect()

//   google.accounts.id.revoke(localStorage.getItem('email'), done => {
//     localStorage.clear();
//     location.reload();
//   })
// }