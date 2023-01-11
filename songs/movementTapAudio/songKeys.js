const path = require('path');
const fs = require('fs');
var util = require('util');

var directoryPath = "/Users/pdealcan/Documents/github/mmbb/songs/movementTapAudio/modifiedAudio"

var songKeys = {
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
  "6": [], 
  "7": [], 
  "8": [], 
  "9": [], 
  "10": [], 
  "11": [], 
} 

var files = fs.readdirSync(directoryPath);

var objectKeys = Object.keys(songKeys)
for(k in objectKeys){
  var nameToCheck = "name__" + objectKeys[k] + ' '
  files.forEach(file => {
    var isThisKey = file.includes(nameToCheck)
    if(isThisKey){
      songKeys[objectKeys[k]].push(file)
    }
  });
}

fs.writeFileSync('./songKeys.json', JSON.stringify(songKeys), 'utf-8');
