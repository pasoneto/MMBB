const fs = require("fs");
const csv = require("csvtojson");

function processTranslation(file, nameObj){
  csv().fromFile(file + ".csv").then((jsonObj)=>{
      lista = []
      for(k in jsonObj){
        lista.push([jsonObj[k]['keys'], jsonObj[k]])
      }
       
      const result = Object.fromEntries(lista)

      var data = JSON.stringify(result);
      var data = "var " + nameObj + " = " + data

      fs.writeFileSync(file + ".json", data);

  })
}

const movementFile = './movement'
const recurringFile = './recurring'
const emotionFile = './emotion'
const mbemaFile = './mbema'
const batFile = './bat'
const initialInstructionsFile = './initialInstructions'
const tappingFile = './tapping'
const sharedMeasurementsFile = './shared'
const taskIconsFile = "./taskIcons"
const buttonsFile = './buttons'
const singingFile = './singing'

processTranslation(movementFile, "movement")
processTranslation(recurringFile, "recurring")
processTranslation(emotionFile, "emotionTranslations")
processTranslation(mbemaFile, "mbema")
processTranslation(batFile, "beatProduction")
processTranslation(initialInstructionsFile, "initialInstructions")
processTranslation(tappingFile, "tapping")
processTranslation(sharedMeasurementsFile, "sharedMeasurementsT")
processTranslation(taskIconsFile, "taskIcons")
processTranslation(buttonsFile, "buttons")
processTranslation(singingFile, "singing")


//namesObjects:
//movement
//recurring
//emotionTranslations
//mbema
//beatProduction
//initialInstructions
//tapping
//sharedMeasurementsT
//tasksIcons
//buttons
