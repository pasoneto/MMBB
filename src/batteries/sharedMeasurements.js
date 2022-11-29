var languages = ["العربية", "Bahasa Indonesia", "Bahasa Melayu", "Български", "Català", "Cebuano", "Čeština", "Dansk", "Deutsch", "Eesti", "Ελληνικά", "English", "Español", "Esperanto", "Euskara", "فارسی", "Français", "Galego", "한국어", "Հայերեն", "हिन्दी", "Hrvatski", "Italiano", "עברית", "Қазақша", "Latina", "Lietuvių", "Magyar", "Minangkabau", "Nederlands", "日本語", "Norsk bokmål", "Norsk nynorsk", "Oʻzbekcha/ўзбекча", "Polski", "Português", "Română", "Русский", "Simple English", "Slovenčina", "Slovenščina", "Српски / srpski", "Srpskohrvatski / српскохрватски", "Suomi", "Svenska", "Tiếng Việt", "Türkçe", "Українська", "Volapük", "Winaray", "中文", "Muu"]
var likertValues = [ {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5} ]
var genderOptions = ['genderOption1', 'genderOption2', 'genderOption3', 'genderOption4']

function generateLikertObject(prompt, likertValues, min, max, required){
      var rObj = {
        type: 'likert',
        prompt: sharedMeasurements[prompt][lang],
        likert_scale_min_label: min,
        likert_scale_max_label: max,
        likert_scale_values: likertValues,
        required: required,
      }
  return(rObj)
}

function generateTextObject(prompt, required, columns, rows){
      var rObj = {
        type: 'text',
        prompt: sharedMeasurements[prompt][lang],
        placeholder: '',
        name: prompt, 
        textbox_columns: columns,
        textbox_rows: rows,
        required: required,
      }
  return(rObj)
}

function generateDropdownObject(prompt, options, required){
      var rObj = {
        type: 'drop-down',
        prompt: sharedMeasurements[prompt][lang], 
        options: options,
        name: prompt, 
        required: required,
      }
  return(rObj)
}

function generateMultiChoiceObject(prompt, options, required){
      var rObj = {
        type: 'multi-choice',
        prompt: sharedMeasurements[prompt][lang], 
        options: options.map(i=>sharedMeasurements[i][lang]),
        name: prompt, 
        required: required
      }
  return(rObj)
}

var listQuestions1 = ['age', 'height']
var listQuestions1 = listQuestions1.map(i => generateTextObject(i, true, 5, 1))
var custom1 = [generateTextObject('weight', false, 5, 1), generateMultiChoiceObject('gender', genderOptions, true), generateDropdownObject('languageSpeaksPrimary', languages, true), generateDropdownObject('languageSpeaksSecondary', languages, false)]
var listQuestions2 = ['yearsPracticeSinging', 'oftenPracticeSingingActive', 'oftenPracticeSingingCurrently', 'yearsPracticeInstrument', 'oftenPracticedInstrumentActive', 'oftenPracticeInstrumentCurrently', 'yearsPracticeDance', 'oftenPracticedDanceActive', 'oftenPracticeDanceCurrently', 'oftenListenMusic', 'yearsTraining']
var listQuestions2 = listQuestions2.map(i => generateLikertObject(i, likertValues, "0 (never)", "5 (daily)", true))
var custom2 = [generateLikertObject("howMusical", likertValues, "0 (not at all)", "5 (very)", true)]
var listQuestions3 = ['musicalGenre', 'whichSongArtistsPrefer', 'leastPreferedGenre', 'leastPreferedArtists']
var listQuestions3 = listQuestions3.map(i => generateTextObject(i, true))
var listQuestions4 = ['likeMusicEmotion', 'getEmotion', 'becomeTearful', 'feelChill', 'dontLikeToDance', 'makesMeDance', 'humming', 'cantStopTapping', 'keepCompany', 'calmsRelaxes', 'chillOut', 'comfortsMe', 'hardlyListen', 'informMyself', 'alwaysLooking', 'moneySpend', 'shareConnection', 'bondOtherPeople', 'singWithOthers', 'connectedPerformers']
var listQuestions4 = listQuestions4.map(i => generateLikertObject(i, likertValues, "Completely disagree", "Completely agree", true))
var listQuestions5 = ['backgroundAtmosphere', 'busyBackground', 'afterRough', 'exhaustedListen', 'magnificentExperience', 'feellWholeBody', 'forgetWorries', 'stressfulThoughts', 'reallyAngry', 'angrySomeone', 'hardExperiences', 'distressedClarify', 'feelsBadComforts', 'feelSadComfort', 'ableJudge', 'spotMistakes', 'recognizingFamiliar', 'canTellOff', 'canTellOutTune', 'noIdeaTune', 'usuallyJoin', 'singFromMemory', 'ableToHitRightNote', 'notAbleHarmony', 'singingPublic', 'singItMyself', 'easyControlMovement', 'easyLearnImitate', 'danceYes', 'embarrassingDance', 'whenDanceBetter', 'feelHaveToDance']
var listQuestions5 = listQuestions5.map(i => generateLikertObject(i, likertValues, "0 (Completely disagree)", "5 (Completely agree)", true))


var sharedMeasurementsTrial = {
  type: jsPsychSurvey,
  pages: [listQuestions1, custom1, listQuestions2, custom2, listQuestions3, listQuestions4],
  title: 'Shared measurements questionnaire',
  button_label_next: 'Continue',
  button_label_back: 'Previous',
  button_label_finish: 'Continue',
  show_question_numbers: 'onPage'
};

