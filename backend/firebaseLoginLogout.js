//Logout firebase
function signOut(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = '../'
  }).catch((error) => {
    console.log(error) 
  });
}

//Watch if user logged in
firebase.auth().onAuthStateChanged(user => {
  if(user){ //If user logged in, stay in choose battery, else go to auth
    document.getElementById("userName").innerHTML = "Hello, " + user.displayName
    var userIDFirebase = user.uid
    document.getElementById("linkToMovement").onclick = function(){
      window.location = '../src/batteries/movementWrap.html?lang=' + lang + '&user=' + userIDFirebase
    }
    document.getElementById("linkToEmotion").onclick = function(){
      window.location = '../src/batteries/emotion.html?lang=' + lang + '&user=' + userIDFirebase
    }
    //document.getElementById("linkToSurvey").href = './src/batteries/movementWrap.html?lang=' + lang
    //document.getElementById("linkToSinging").href = './src/batteries/movementWrap.html?lang=' + lang
  } else {
    window.location.href = '../'
  }
})
