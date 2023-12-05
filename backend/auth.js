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
  //Cannot run this because do not have access to necessary url params
  //signInSuccessUrl: studyLinks["chooseBatteryLink"] + '?lang=' + lang + '&user=' + userID,
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: 'google.com',
  privacyPolicyUrl: function() {
    window.location.assign('youtube.com');
  }
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);

