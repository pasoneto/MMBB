const fs = require('fs');
const path = require('path');

//Filter function
function filterStringsInBothArrays(arrayA, arrayB) {
  const setB = new Set(arrayB);
  const filteredArray = arrayA.filter(item => setB.has(item));
  return filteredArray;
}

//Paths
var dyad_path = "./dyads/"
var single_path = "./singles/"
var conditions = ["control", "experiment"]

var dControl = dyad_path + conditions[0];
var dExperiment = dyad_path + conditions[1];

var filesControl = fs.readdirSync(dControl)
var filesExperiment = fs.readdirSync(dExperiment)

var all_experiment = []
var all_control = []

for(k in filesExperiment){
  var f = filesExperiment[k].split("_")
  bName = f.slice(3, filesExperiment.length).join("_")
  obj = {
    base_name: bName,
    full_name: filesExperiment[k],
    condition: "experiment"
  }
  all_experiment.push(obj)
}

for(k in filesControl){
  var f = filesControl[k].split("_")
  bName = f.slice(3, filesControl.length).join("_")
  obj = {
    base_name: bName,
    full_name: filesControl[k],
    condition: "control"
  }
  all_control.push(obj)
}

//Merging lists:
const mergedList = all_experiment.concat(all_control);
fs.writeFileSync("./dyads.js", JSON.stringify(mergedList));


//Singles
var dControl = single_path + conditions[0];
var dExperiment = single_path + conditions[1];

var filesControl = fs.readdirSync(dControl)
var filesExperiment = fs.readdirSync(dExperiment)

var all_experiment = []
var all_control = []

for(k in filesExperiment){
  var f = filesExperiment[k].split("_")
  c = f[0]
  bName = f.slice(1, filesExperiment.length).join("_")
  all_experiment.push(bName)
}

for(k in filesControl){
  var f = filesControl[k].split("_")
  c = f[0]
  bName = f.slice(1, filesControl.length).join("_")
  all_control.push(bName)
}

var all_files = filterStringsInBothArrays(all_experiment, all_control)

var singleFiles = []
for(k in all_files){
  obj = {
    base_name: all_files[k]
  }  
  singleFiles.push(obj)
}

fs.writeFileSync("./singles.js", JSON.stringify(singleFiles));













