const fs = require("fs");

filesRead = ["movement", "recurring", "emotion", "mbema", "bat", "initialInstructions", "tapping", "shared", "taskIcons", "buttons"]

var allData = ""
for(k in filesRead){
  var data = fs.readFileSync("./" + filesRead[k] + ".json", 'utf8')
  var allData = allData + data + "\n"
}

fs.writeFileSync("../translations.js", allData);
