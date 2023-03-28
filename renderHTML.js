function signOut(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.href = './'
  }).catch((error) => {
    console.log(error) 
  });
}

var allTasksLinks = ["Emotion", "Singing", "Survey", "Movement"]
allTasksLinks.map(i => {
  if(getCookie(i) == "done"){
    document.getElementById("task" + i).style.background = "lightgreen";
  }
})


firebase.auth().onAuthStateChanged(user => {
  if(user){
    document.getElementById("userName").innerHTML = "Hello, " + user.displayName
    var userIDFirebase = user.uid
    document.getElementById("linkToMovement").onclick = function(){
      window.location = './src/batteries/movementWrap.html?lang=' + lang + '&user=' + userIDFirebase
    }
    document.getElementById("linkToEmotion").onclick = function(){
      window.location = './src/batteries/emotion.html?lang=' + lang + '&user=' + userIDFirebase
    }
    //document.getElementById("linkToSurvey").href = './src/batteries/movementWrap.html?lang=' + lang
    //document.getElementById("linkToSinging").href = './src/batteries/movementWrap.html?lang=' + lang
  } else {
    window.location.href = './'
  }
})
