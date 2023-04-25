const fs = require('fs');

async function pushImageJATOS(data, fname, type){
  var api_key = "jap_F3uymbK1YIMdqgdkcyzgWNN6kmbRSTo6b9a37"
  var study_uuid = "8baf2255-8021-4280-b679-4abfdbc6ae67"

  var blob = new Blob([data],{type: type});
  var formData = new FormData()
  formData.append("studyAssetsFile", blob, fname); 

  var url = 'https://mmbb.ltdk.helsinki.fi/jatos/api/v1/studies/28' + fname
  var headers = {'accept': '*/*', 'Authorization': 'Bearer ' + api_key}

  var respJATOS = await fetch(url, { method: 'POST', headers: headers, body: formData })
}

//fs.readFile('../../images/mbemaLogo.svg', (err, file) => {
  //var type = "image/svg+xml"
  //pushImageJATOS(file, "/assets/images/" + "mbemaLogo.svg", type)
  //})

//files = ["different.svg", "familiar.svg", "novel.svg", "same.svg"]
//for(k in files){
  //fs.readFile('../../images/imagesMBEMA/', (err, file) => {
    //var type = "image/svg+xml"
    //pushImageJATOS(file, "/assets/images/imagesMBEMA/" + files[k], type)
    //})
//console.log("Success, pushed " + files[k])
//}

//var songs = ["beep1sec.mp3", "beep1sec.wav", "beep1sec_orig.wav"]
//songs/movementTapAudio/elPesebre.mp3
//for(k in songs){
  //fs.readFile('../../songs/mbemaShort/' + songs[k], (err, file) => {
    //var type = 'multipart/form-data'
    //pushImageJATOS(file, "/assets/songs/mbemaShort/" + songs[k], type)
    //})
  //console.log("Success, pushed " + songs[k])
  //}

fs.readFile('../../songs/mbemaShort/beep1sec.wav', (err, file) => {
  var type = 'multipart/form-data'
  pushImageJATOS(file, "/assets/songs/mbemaShort/" + 'beep1sec.wav', type)
})

fs.readFile('../../songs/mbemaShort/beep1sec.mp3', (err, file) => {
  var type = 'multipart/form-data'
  pushImageJATOS(file, "/assets/songs/mbemaShort/" + 'beep1sec.mp3', type)
})

fs.readFile('../../songs/mbemaShort/beep1sec_orig.wav', (err, file) => {
  var type = 'multipart/form-data'
  pushImageJATOS(file, "/assets/songs/mbemaShort/" + 'beep1sec_orig.wav', type)
})

fs.readFile('../../songs/mbemaShort/1. Melody/Melody - 1.wav', (err, file) => {
  var type = 'multipart/form-data'
  pushImageJATOS(file, "/assets/songs/mbemaShort/1. Melody/Melody - 1.wav", type)
})

var files = ['Melody - 1.wav','Melody - 10.wav', 'Melody - 11.wav','Melody - 12.wav', 'Melody - 13.wav','Melody - 14.wav', 'Melody - 15.wav','Melody - 16.wav', 'Melody - 17.wav','Melody - 18.wav', 'Melody - 19.wav','Melody - 2.wav', 'Melody - 20.wav','Melody - 3.wav', 'Melody - 4.wav','Melody - 5.wav', 'Melody - 6.wav','Melody - 7.wav', 'Melody - 8.wav','Melody - 9.wav', 'Melody - Example 1.wav', 'Melody - Example 2.wav' ]
files.forEach(file => {
    fs.readFile(file, (err, data) => {
      var type = 'multipart/form-data'
      var fName = "/assets/songs/mbemaShort/1. Melody/" + file
      console.log(fName)
      pushImageJATOS(file, fName, type)
    });
});

fs.readdir("../../songs/mbemaShort/2. Rhythm", (err, files) => {
  console.log(files)
  files.forEach(file => {
    fs.readFile(file, (err, data) => {
      var type = 'multipart/form-data'
      var fName = "/assets/songs/mbemaShort/2. Rhythm/" + file
      console.log(fName)
      pushImageJATOS(file, fName, type)
    });
  });
});

fs.readdir("../../songs/mbemaShort/3. Memory", (err, files) => {
  console.log(files)
  files.forEach(file => {
    fs.readFile(file, (err, data) => {
      var type = 'multipart/form-data'
      var fName = "/assets/songs/mbemaShort/3. Memory/" + file
      console.log(fName)
      pushImageJATOS(file, fName, type)
    });
  });
});
