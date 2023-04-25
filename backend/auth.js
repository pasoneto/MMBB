// FirebaseUI config.
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: async function(authResult, redirectUrl) {
      var userName = firebase.auth().currentUser.displayName
      var userID = firebase.auth().currentUser.uid

      //firebase.auth().currentUser.getIdToken()

      //Will throw error if this is first logIn, because there is no logFile yet
      try{ 
        var userLog = await getFromJATOS(userID + "_logFile.txt")
      } catch(e){
        console.log("User has no log file. Creating...")
        setupLog(userID) //Setting up logFile
        var userLog = { userID: userID }
      }

      var lang = 'eng'

      //var didSharedMeasurements = await userLog['sharedM']

      //if(didSharedMeasurements == undefined){
        //Change with link to sharedMeasurements
        //var urlRedirect = './src/batteries/sharedMeasurements.html' + '?lang=' + lang + '&user=' + userID
        //jatos.endStudyAndRedirect(urlRedirect)
        //} else {
      var urlRedirect = studyLinks["chooseBatteryLink"] + '?lang=' + lang + '&user=' + userID
      console.log(urlRedirect)
      //jatos.endStudyAndRedirect(urlRedirect)
          //}

      return false;
    },
  },
  //signInSuccessUrl: '../pages/chooseBattery.html',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  //tosUrl: '../pages/chooseBattery.html',
  privacyPolicyUrl: function() {
    window.location.assign('./');
  }
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);
