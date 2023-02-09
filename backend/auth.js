// FirebaseUI config.
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      var userName = firebase.auth().currentUser.displayName
      var authToken = firebase.auth().currentUser.uid
      firebase.auth().currentUser.getIdToken().then(r => {
        window.location.assign("./chooseBattery.html")
      })
      return false;
    },
  },
  signInSuccessUrl: './chooseBattery.html',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: './chooseBattery.html',
  privacyPolicyUrl: function() {
    window.location.assign('./');
  }
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);
