//Firebase credentials
const firebaseConfig = {
        apiKey: "AIzaSyD7Sxzak9C4RIA23s1FbVvOEvx-CTNnfoI",
        authDomain: "sequence-e4afd.firebaseapp.com",
        projectId: "sequence-e4afd",
        storageBucket: "sequence-e4afd.appspot.com",
        messagingSenderId: "743153626983",
        appId: "1:743153626983:web:b89bfbaca62f28495749c2"
};

//Send errors to firebase
window.addEventListener("error", (event) => {
      var userID = urlParams.get('user')
      var data = {"errorLog": event, 'userID': userID}
      var app = firebase.initializeApp(firebaseConfig);
      var db = firebase.firestore();
      var expcoll = db.collection("riikka")
      var result_obj = {r : JSON.parse(data.json())}
      expcoll.add(result_obj)
});

async function pushDatabase(collectionName, finalData){
      var app = firebase.initializeApp(firebaseConfig);
      var db = firebase.firestore();
      var expcoll = db.collection(collectionName)
      var result_obj = {r : JSON.parse(finalData.json())}
      return(expcoll.add(result_obj))
}
