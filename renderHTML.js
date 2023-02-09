function signOut(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = './'
  }).catch((error) => {
    console.log(error) 
  });
}

firebase.auth().onAuthStateChanged(user => {
  if(user){
    document.getElementById("userName").innerHTML = "Hello, " + user.displayName
    var userIDFirebase = user.uid
    document.getElementById("linkToMovement").href = './src/batteries/movementWrap.html?lang=' + lang + '&user=' + userIDFirebase
    //document.getElementById("linkToSurvey").href = './src/batteries/movementWrap.html?lang=' + lang
    //document.getElementById("linkToEmotion").href = './src/batteries/movementWrap.html?lang=' + lang
    //document.getElementById("linkToSinging").href = './src/batteries/movementWrap.html?lang=' + lang
  } else {
    window.location.href = './'
  }
})
