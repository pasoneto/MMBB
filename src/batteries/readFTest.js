const fs = require('fs');

var pathBatteries = '/assets/src/batteries/'
var pathIndex = '/assets/'
var pathChooseBattery = '/assets/pages/'
var pathUtils = '/assets/utils/'
var pathAuth = '/assets/backend/'
var pathStyles = '/assets/src/styles/'
var pathPlugins = '/assets/jspsych/dist/'
var pathCustom = '/assets/jspsych/dist/custom/'

//'content-type': 'multipart/form-data'

async function pushFileJATOS(string, fileName, fileType = ""){
  var api_key = "jap_F3uymbK1YIMdqgdkcyzgWNN6kmbRSTo6b9a37"
  var study_uuid = "8baf2255-8021-4280-b679-4abfdbc6ae67"

  var blob = new Blob([string],{type:"text/plain"});
  var formData = new FormData()

  formData.append("studyAssetsFile", blob, fileName); 

  var url = 'https://mmbb.ltdk.helsinki.fi/jatos/api/v1/studies/28' + fileName
  var headers = {'accept': '*/*', 'Authorization': 'Bearer ' + api_key}

  var respJATOS = await fetch(url, { method: 'POST', headers: headers, body: formData })

  return(respJATOS)
}

async function getFromJATOS(fileName){

  var api_key = "jap_F3uymbK1YIMdqgdkcyzgWNN6kmbRSTo6b9a37"
  var url = 'https://mmbb.ltdk.helsinki.fi/jatos/api/v1/studies/28/assets/'
  var headers = {'accept': '*/*', 'Authorization': 'Bearer ' + api_key}

  var respJATOS = await fetch(url + fileName, { method: 'GET', headers: headers})
  //var respJATOS = await respJATOS.json()
  
  return(respJATOS)
}

async function deleteFileJATOS(fileName){
  var api_key = "jap_F3uymbK1YIMdqgdkcyzgWNN6kmbRSTo6b9a37"
  var study_uuid = "8baf2255-8021-4280-b679-4abfdbc6ae67"

  var url = 'https://mmbb.ltdk.helsinki.fi/jatos/api/v1/studies/28/assets/' + fileName
  var headers = {'accept': '*/*', 'Authorization': 'Bearer ' + api_key}

  var respJATOS = await fetch(url, { method: 'DELETE', headers: headers })

  return(respJATOS)
}

fs.readdir("./", (err, files) => {
  files.forEach(file => {
    fs.readFile(file, 'utf8', (err, data) => {
      pushFileJATOS(data, pathBatteries + file)
      console.log("Success, pushed " + file)
    });
  });
});

//Fetching plugins
fs.readdir("../../jspsych/dist", (err, files) => {
  files.forEach(i => {
    fs.readFile("../../jspsych/dist/" + i, 'utf8', (err, data) => {
      console.log(i)
      pushFileJATOS(data, pathPlugins + i)
    })
  })
})

//Fetching custom functions
fs.readdir("../../jspsych/dist/custom/", (err, files) => {
  files.forEach(i => {
    fs.readFile("../../jspsych/dist/custom/" + i, 'utf8', (err, data) => {
      console.log(i)
      pushFileJATOS(data, pathCustom + i)
    })
  })
})

fs.readFile("../../index.html", 'utf8', (err, data) => {
  pushFileJATOS(data, pathIndex + "index.html" , 28)
  console.log("Success, pushed " + "index.html")
});

fs.readFile("../../pages/chooseBattery.html", 'utf8', (err, data) => {
  pushFileJATOS(data, pathChooseBattery + "chooseBattery.html", 28)
  console.log("Success, pushed " + "chooseBattery.html")
});

fs.readFile("../../utils/studyLinks.js", 'utf8', (err, data) => {
  pushFileJATOS(data, pathUtils + "studyLinks.js" , 28)
  console.log("Success, pushed " + "studyLinks.js")
});

fs.readFile("../../utils/translations.js", 'utf8', (err, data) => {
  pushFileJATOS(data, pathUtils + "translations.js" , 28)
  console.log("Success, pushed " + "translations.js")
});

fs.readdir("../styles/", (err, files) => {
  files.forEach(file => {
    fs.readFile("../styles/" + file, 'utf8', (err, data) => {
      pushFileJATOS(data, pathStyles + file)
      console.log("Success, pushed " + file)
    });
  });
});

//different.svg familiar.svg  novel.svg     same.svg
//fs.readFile('../../images/imagesMBEMA/different.svg', (err, file) => {
  //console.log(file)
//})

fs.readFile("../../backend/auth.js", 'utf8', (err, data) => {
  pushFileJATOS(data, pathAuth + "auth.js" , 28)
  console.log("Success, pushed " + "auth.js")
});


