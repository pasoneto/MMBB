const fs = require('fs');

var pathPlugins = '/assets/jspsych/dist/'

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

//Fetching plugins
fs.readdir("../../jspsych/dist", (err, files) => {
  files.forEach(i => {
    fs.readFile(i, 'utf8', (err, data) => {
      console.log(data)
      //pushFileJATOS(data, pathPlugins + i)
    })
  })
})
