async function setupLog(userID){
  const initialLogObject = { userID: userID }
  var resp = await pushJATOS(initialLogObject, "logs/" + userID, "logFile")
  console.log(resp)
}

async function modifyLog(userID, batteryCompleted){
  var userLog = await getLog(userID)
  userLog[batteryCompleted] = true

  var resp = await pushJATOS(userLog, "logs/" + userID, "logFile")
}

async function getLog(userID){
  var fileName = "logs/" + userID + "_logFile.txt"
  var logUser = await getFromJATOS(fileName)
  return(logUser)
}
