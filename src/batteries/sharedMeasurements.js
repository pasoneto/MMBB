var frontPageShared = {
    type: jsPsychInstructions,
    pages: ["Welcome!<br>This is a questionnaire about your music habits"],
    button_label_next: buttons[0][lang],
    button_label_previous: buttons[1][lang],
    show_clickable_nav: true
}

var languages = ["Suomi", "العربية", "Bahasa Indonesia", "Bahasa Melayu", "Български", "Català", "Cebuano", "Čeština", "Dansk", "Deutsch", "Eesti", "Ελληνικά", "English", "Español", "Esperanto", "Euskara", "فارسی", "Français", "Galego", "한국어", "Հայերեն", "हिन्दी", "Hrvatski", "Italiano", "עברית", "Қазақша", "Latina", "Lietuvių", "Magyar", "Minangkabau", "Nederlands", "日本語", "Norsk bokmål", "Norsk nynorsk", "Oʻzbekcha/ўзбекча", "Polski", "Português", "Română", "Русский", "Simple English", "Slovenčina", "Slovenščina", "Српски / srpski", "Srpskohrvatski / српскохрватски", "Svenska", "Tiếng Việt", "Türkçe", "Українська", "Volapük", "Winaray", "中文", "Muu"]
var likertValues = [ {value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5} ]
var genderOptions = ['genderOption1', 'genderOption2', 'genderOption3', 'genderOption4']

function generateLikertObject(prompt, likertValues, min, max, required, scale){
      var rObj = {
        type: 'likert',
        prompt: sharedMeasurements[prompt][lang] + scale,
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

var listQuestions1 = ['age', 'height'].map(i => generateTextObject(i, true, 5, 1))
var custom0 = [generateTextObject('weight', false, 5, 1), generateMultiChoiceObject('gender', genderOptions, true), generateDropdownObject('languageSpeaksPrimary', languages, true), generateDropdownObject('languageSpeaksSecondary', languages, false)]

var custom1 = ['yearsPracticeSinging', 'yearsPracticeInstrument', 'yearsPracticeDance', 'yearsTraining'].map(i => generateTextObject(i, false, 5, 1))

var listQuestions2 = ['oftenPracticeSingingActive', 'oftenPracticeSingingCurrently'].map(i => generateLikertObject(i, likertValues, "", "", true, " 1 (not at all) - 5 (very)."))
var listQuestions3 = ['oftenPracticedInstrumentActive', 'oftenPracticeInstrumentCurrently'].map(i => generateLikertObject(i, likertValues, "", "", true, " 1 (never) - 5 (daily)."))
var listQuestions4 = ['oftenPracticedDanceActive', 'oftenPracticeDanceCurrently', 'oftenListenMusic'].map(i => generateLikertObject(i, likertValues, "", "", true, "1 (never) - 5 (daily)."))

listQuestions2.unshift(custom1[0])
listQuestions3.unshift(custom1[1])
listQuestions4.unshift(custom1[2])
listQuestions4.push(custom1[3])
listQuestions4.push(generateLikertObject("howMusical", likertValues, "", "", true, "1 (not at all) - 5 (very)"))

var listQuestions5 = ['musicalGenre', 'whichSongArtistsPrefer', 'leastPreferedGenre', 'leastPreferedArtists'].map(i => generateTextObject(i, true, 5))
var listQuestions6 = ['likeMusicEmotion', 'getEmotion', 'becomeTearful', 'feelChill', 'dontLikeToDance', 'makesMeDance', 'humming', 'cantStopTapping', 'keepCompany', 'calmsRelaxes', 'chillOut', 'comfortsMe', 'hardlyListen', 'informMyself', 'alwaysLooking', 'moneySpend', 'shareConnection', 'bondOtherPeople', 'singWithOthers', 'connectedPerformers'].map(i => generateLikertObject(i, likertValues, "", "", true, "1 (Completely disagree) - 5 (Completely agree)"))
var listQuestions7 = ['backgroundAtmosphere', 'busyBackground', 'afterRough', 'exhaustedListen', 'magnificentExperience', 'feellWholeBody', 'forgetWorries', 'stressfulThoughts', 'reallyAngry', 'angrySomeone', 'hardExperiences', 'distressedClarify', 'feelsBadComforts', 'feelSadComfort', 'ableJudge', 'spotMistakes', 'recognizingFamiliar', 'canTellOff', 'canTellOutTune', 'noIdeaTune', 'usuallyJoin', 'singFromMemory', 'ableToHitRightNote', 'notAbleHarmony', 'singingPublic', 'singItMyself', 'easyControlMovement', 'easyLearnImitate', 'danceYes', 'embarrassingDance', 'whenDanceBetter', 'feelHaveToDance'].map(i => generateLikertObject(i, likertValues, "", "",  true, "1 (Completely disagree) - 5 (Completely agree)"))

var sharedMeasurementsTrial = {
  type: jsPsychSurvey,
  pages: [listQuestions1, custom0, listQuestions2, listQuestions3, listQuestions4, listQuestions5, listQuestions6, listQuestions7],
  title: 'Please, answer the following questions',
  button_label_next: 'Continue',
  button_label_back: 'Previous',
  button_label_finish: 'Continue',
  show_question_numbers: 'onPage',
  on_load: function(){
    document.querySelector(".sv_header").style.marginBottom = "-50px"
    document.querySelector(".sv_next_btn").style.background = "#fa6400";
    document.querySelector(".sv_prev_btn").style.background = "purple";
    document.querySelector(".sv_next_btn").style.color = "#fff";
    document.querySelector(".sv_prev_btn").style.color = "#fff";
    document.querySelector(".sv_complete_btn").style.background = "#fa6400";
  }
};

//Friends strangers question
var isFriendsStrangers = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "If you're part of the Music and Dance study, tell us your participant number", 
      name: 'FruitDislike', 
      options: ['1', '2', '3', '4'], 
      required: true,
      horizontal: true
    }
  ],
};

var messageFinishSharedMeasures = {
  type: jsPsychHtmlButtonResponse,
  prompt: emotionTranslations['thankYouEnd'][lang],
  choices: [],
  trial_duration: 2000,
  stimulus: '',
  on_start: function(){
    var cookieExpires = (new Date(Date.now()+ 86400*1000)).toUTCString();
    document.cookie = "SharedMeasures=done;" + " expires=" + cookieExpires + "; path=/"
  }
};
