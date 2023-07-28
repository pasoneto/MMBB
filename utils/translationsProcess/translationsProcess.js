const fs = require("fs");
const csv = require("csvtojson");

function processTranslation(file, keys, nameObj){
  csv().fromFile(file + ".csv").then((jsonObj)=>{
      lista = []
      for(k in jsonObj){
        lista.push([keys[k], jsonObj[k]])
      }
      const result = Object.fromEntries(lista)

      console.log(file)
      console.log(keys.length == jsonObj.length)

      var data = JSON.stringify(result);
      var data = "var " + nameObj + " = " + data

      fs.writeFileSync(file + ".json", data);

  })
}

var movementKeys = ['movementOpen', 'accessAcelerometer', 'instruction1', 'instruction2', 'instruction3', 'instruction4', 'instruction5', 'instruction6', 'instruction7', 'instruction8', 'instruction9', 'instruction10', 'instruction11', 'instruction12', 'instruction13', 'instruction14', 'instruction15', 'instruction16', 'instruction17', 'instruction18', 'instruction19', 'instruction20', 'instruction21', 'instruction22', 'instruction23', 'instruction24', 'instruction25', 'instruction26', 'Instruction27', 'howFamiliar', 'notAtAll', 'veryMuch', 'howMuchLikeSong', 'howMuchMoveSong', 'aLot', 'howMuchLikeBeat', 'howMuchMoveBeat', 'haveYouHeardThisSong', 'wherePhone', 'pocket', 'purse', 'hand', 'other', 'song', 'height', 'weight']
var recurringKeys = ['openPage', 'welcome', 'readyNext', 'endTask1', 'endTask2', 'endTask3', 'loading', 'continue', 'readyNext2', 'howEasy', 'veryEasy', 'veryHard', 'instruction1', 'instruction2', 'instruction3', 'instruction4', 'instruction5', 'instruction6', 'instruction7', 'instruction8', 'instruction9', 'instruction10', 'instruction12', 'instruction13', 'instruction14', 'instruction15', 'instruction16', 'instruction17', 'notAtAll', 'veryMuch', 'completionProgress']
var emotionKeys = ['openStatement', 'pleaseAnswer', 'musicEmotionPart2', 'angry', 'happy', 'sad', 'tender', 'instructions1', 'instructions2', 'instructions3', 'whichEmotion', 'listen', 'instructions4', 'instructions5', 'mood', 'energy', 'howStrongEmotion', 'howMuchLike', 'howFamiliar', 'veryNegative', 'negative', 'positive', 'veryLowEnergy', 'veryHighEnergy', 'rateEmotionalContent', 'notAtAll', 'veryStrong', 'stronglyDisliked', 'neutral', 'choose', 'stronglyLiked', 'veryUnfamiliar', 'veryFamiliar', 'thankYouRepeat', 'thankYouEnd', 'howOld', 'gender', 'feedbackAsk', 'feedbackPlaceHolder', 'genderOption1', 'genderOption2', 'genderOption3', 'genderOption4']
var mbemaKeys = ['welcome', 'taskConsists', 'wholeTask', 'firstPart', 'firstPartB', 'yourTask', 'yourTaskB', 'firstLets', 'listen', 'thanksThird', 'previousParts', 'previousPartsB', 'canYouTell', 'canYouTellB', 'firstCouple', 'thankYouSimilar', 'youWillAgain', 'youWillAgainB', 'firstPractice', 'nowContinue', 'nowContinueB', 'nowContinueC', 'totalOfTwenty', 'totalOfTwentyB', 'totalOfTwentyC', 'choose', 'heardBefore', 'answerWrong', 'difficult', 'easy', 'taskComplete', 'thankYouThisPart', "next", "previous", "same", "different", "yes", "no", "home"]
var batKeys = ['instruction0', 'instruction1', 'instruction2', 'instruction3', 'instruction4', 'instruction5', 'instruction6', 'instruction7', 'instruction8', 'instruction9', 'instruction10', 'instruction11', 'instruction12', 'adjustBeat', 'openPage', 'howSatisfied']
var initialInstructionsKeys = ['canYouHear', 'yes', 'no', 'gettingHelp', 'canYouHear2', 'idk']
var tappingKeys = ['instruction1', 'instruction2', 'instruction3', 'instruction4', 'instruction5', 'instruction6', 'instruction7', 'instruction8', 'instruction9', 'instruction10', 'instruction11', 'tapHere', 'recording', 'openPage']
var sharedMeasurementsKeys = ["howLongSing", "howOftenSingBefore", "howOftenSingNow", "howMuchTuitionSing", "howLongInstrumentHobby", "howOftenPlayHobby", "howOftenPlayNow", "howMuchTuitionInstrument", "howLongDanceHobby", "howLongDanceHobyBefore", "howOftenDanceNow", "howMuchTuitionDance", "howOftenListenMusicNow", "howMusical", "notAtAlMusical", "notThatMusical", "aBitMusical", "quiteMusical", "veryMusical", "never", "oneTwoYears", "threeFiveYears", "sixNineYears", "tenMoreYears", "veryRarely", "monthly", "weekly", "daily", "surveyMMBB", "personalBackground", "musicalBackground", "perception", "singing", "dancing", "musicalPreference", "musicalExperiences", "prompt", "iCanTell", "iCanTellTune", "iFind", "haveTrouble", "whenISing", "title", "pleaseAnswer", "primaryLanguage", "secondaryLanguage", "yearOfBirth", "nationality", "gender", "genderOther", "female", "male", "other", "ratherNotSay", "education", "educationOther", "primarySchool", "comprehensiveSchool", "secondaryEducation", "vocationalTraining", "bachelors", "masters", "doctoral", "howMuchLikeGenre", "dislikeStrongly", "dislikeModerately", "dislkikeAlittle", "neutral", "likeALittle", "likeModerately", "likeStrongly", "blues", "jazz", "classical", "folk", "rock", "alternative", "heavyMetal", "country", "religious", "pop", "rap", "soul", "electronic", "question", "completelyDisagree", "somewhatDisagree", "neitherDisagreeAgree", "somewhatAgree", "completelyAgree", "shareMusic", "freeNoListen", "listenEmotion", "musicCompany", "dontLikeDance", "musicMakesMeBond", "informMyself", "getEmotional", "musicCalms", "musicMakesMeDanceOften", "lookingNewMusic", "canBecomeTearful", "likeToSing", "musicHelpsChill", "hummingAlong", "concertConnected", "spendQuite", "sometimesFeelChills", "musicComforts", "whenIHearTune", "songDontKnow", "ableHit", "likeSinging", "canSing", "afterHearing", "easyControl", "ifSomeone", "whenDance", "greatTrack", "tiredOut", "musicHelps", "listenMusic", "backgroundAtmosphere", "listenPerk", "reallyAngry", "feelFantastic", "forgetWorries", "magnificentExperiences", "whenBusy", "musicHelped", "feelingSadComforts", "everythingSad", "whenStressful"]
var taskIconsKeys = ["movement", "singing", "survey", "emotion", "MBEMA", "rhythm"]
var buttonsKeys = ["next", "previous", "continue", "choose", "start", "home", "record"]
var singingKeys = ['welcome', 'inThisTask', 'pleaseSelect', 'selectThis', 'letsCheck', 'recordAgain', 'recordingOK', 'yourMicrophone', 'recording', 'recording2', 'recording3', 'recording4', 'recording5', 'hereYouMay', 'hereYouMay2', 'shortSinging', 'firstLetsType', 'woman', 'man', 'child', 'byPressing', 'whichRange', 'low', 'mild', 'high', 'singBack', 'practiceRound', 'toneFirst', 'thankYouSingingDifficult', 'difficult', 'easy', 'singAlongIndividual', 'listenFirstPractice', 'toneListenFirst', 'nextTaskSingBack', 'practiceMelody', 'melodyListenFirst', 'shortMelodySing', 'practiceShortMelody', 'listenFirstShortMelody', 'nextTaskHappyBirthday', 'lyricsAre', 'nextTaskSingAlongHappyBirthday', 'lyricsAreSingAlong', 'finalTask', 'theLyricsGoLike', 'nextHearThreeTimes', 'endSinging']

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

processTranslation(movementFile, movementKeys, "movement")
processTranslation(recurringFile, recurringKeys, "recurring")
processTranslation(emotionFile, emotionKeys, "emotionTranslations")
processTranslation(mbemaFile, mbemaKeys, "mbema")
processTranslation(batFile, batKeys, "beatProduction")
processTranslation(initialInstructionsFile, initialInstructionsKeys, "initialInstructions")
processTranslation(tappingFile, tappingKeys, "tapping")
processTranslation(sharedMeasurementsFile, sharedMeasurementsKeys, "sharedMeasurementsT")
processTranslation(taskIconsFile, taskIconsKeys, "taskIcons")
processTranslation(buttonsFile, buttonsKeys, "buttons")
processTranslation(singingFile, singingKeys, "singing")


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
