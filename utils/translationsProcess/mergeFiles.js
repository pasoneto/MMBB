const fs = require("fs");

filesRead = ["movement", "recurring", "emotion", "mbema", "bat", "initialInstructions", "tapping", "shared", "taskIcons", "buttons", "singing"]

var allData = ""
for(k in filesRead){
  var data = fs.readFileSync("./" + filesRead[k] + ".json", 'utf8')
  var allData = allData + data + "\n"
}

fs.writeFileSync("../translations.js", allData);


var allData = ""
for(k in filesRead){
  var data = fs.readFileSync("./" + filesRead[k] + ".csv", 'utf8')
  var allData = allData + data + ",\n"
}

var outputFile = '/Users/pdealcan/Documents/github/data/CoE/pilotMMBB/outputs/allTranslationsT.csv'
fs.writeFileSync(outputFile, allData);
