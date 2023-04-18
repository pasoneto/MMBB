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

      var didSharedMeasurements = await userLog['sharedM']

      if(didSharedMeasurements == undefined){
        window.location.assign('./src/batteries/sharedMeasurements.html?lang=' + lang + '&user=' + userID)
      } else {
        window.location.assign('./pages/chooseBattery.html?lang=' + lang + '&user=' + userID)
      }

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
