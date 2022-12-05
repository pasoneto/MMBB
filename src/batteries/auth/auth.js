const firebaseConfig = {
  apiKey: "AIzaSyByq9rXgjPsyBNJy6tcJT8hiLJPDfCd0ik",
  authDomain: "mmbb-dc10a.firebaseapp.com",
  projectId: "mmbb-dc10a",
  storageBucket: "mmbb-dc10a.appspot.com",
  messagingSenderId: "186246762750",
  appId: "1:186246762750:web:0f3652e31b822a9da6d5af",
  measurementId: "G-0XZ1S2N0GF"
};

firebase.initializeApp(firebaseConfig);

// FirebaseUI config.
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      var userName = firebase.auth().currentUser.displayName
      document.getElementById("container").innerHTML = mainPage;
      document.getElementById("userName").innerHTML = "Hello, " + userName;
      return false;
    },
  },
  signInSuccessUrl: './index.html',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: './',
  privacyPolicyUrl: function() {
    window.location.assign('./');
  }
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);
