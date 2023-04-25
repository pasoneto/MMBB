//Logout firebase
function signOut(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    //window.location.href = '../'
  }).catch((error) => {
    console.log(error) 
  });
}

