// FirebaseUI config.
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: async function(authResult, redirectUrl) {
      var userName = firebase.auth().currentUser.displayName
      var userID = firebase.auth().currentUser.uid

      var lang = 'eng'

      var urlRedirect = studyLinks["chooseBatteryLink"] + '?lang=' + lang + '&user=' + userID
      console.log(urlRedirect)

      return false;
    },
  },
  //signInSuccessUrl: '../pages/chooseBattery.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  //tosUrl: '../pages/chooseBattery.html',
  privacyPolicyUrl: function() {
    window.location.assign('./');
  }
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);
