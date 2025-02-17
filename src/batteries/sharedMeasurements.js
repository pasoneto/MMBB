function generateSharedMeasurementsTimeline(lang, version){

  var agreement1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<iframe src="../src/utils/Privacy_Notice_MMBB_' + lang + '.pdf" width="100%" height="600px" loading="lazy" title="PDF-file" ></iframe>',
    choices: [recurring['continue'][lang]],
    prompt: ""
  };

  var agreement2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<iframe src="../src/utils/informed_consent_' + lang + '.pdf" width="100%" height="600px" loading="lazy" title="PDF-file" ></iframe>',
    choices: [recurring['continue'][lang]],
    prompt: ""
  };

  var frontPageShared = {
      type: jsPsychInstructions,
      pages: [sharedMeasurementsT['surveyMMBB'][lang]],
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var between1 = {
      type: jsPsychInstructions,
      pages: [sharedMeasurementsT['personalBackground'][lang]],
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var between2 = {
      type: jsPsychInstructions,
      pages: [sharedMeasurementsT['musicalBackground'][lang]],
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var between3 = {
      type: jsPsychInstructions,
      pages: [sharedMeasurementsT['musicalPreference'][lang]],
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var between4 = {
      type: jsPsychInstructions,
      pages: [sharedMeasurementsT['musicalExperiences'][lang]],
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var between5 = {
      type: jsPsychInstructions,
      pages: [sharedMeasurementsT['perception'][lang]],
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var between6 = {
      type: jsPsychInstructions,
      pages: [sharedMeasurementsT['singing'][lang]],
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var between7 = {
      type: jsPsychInstructions,
      pages: [sharedMeasurementsT['dancing'][lang]],
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  function generateTextObject(prompt, required, columns, rows){
        var rObj = {
          type: 'text',
          prompt: prompt,
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
          prompt: prompt, 
          options: options,
          name: prompt, 
          required: required, //simu
          //required: false //simuBack
        }
    return(rObj)
  }

  function generateManyDropDowns(i, prompt){
    var modelSeed = {
      type: jsPsychSurvey,
      pages: [[i]],
      title: prompt,
      button_label_next: buttons["continue"][lang],
      button_label_back: buttons["previous"][lang],
      button_label_finish: buttons["continue"][lang],
      on_load: () => {
        changeStyle()
      },
    }
    return(modelSeed)
  }

  function changeStyle(){
      document.querySelector(".sv_body").style.background = "#e9edf5";
      document.querySelector(".sv_header").style.background = "#e9edf5";
      document.querySelector(".sv_header").style.marginBottom = "-50px";
      document.querySelector(".sv_next_btn").style.background = "#fa6400";
      document.querySelector(".sv_prev_btn").style.background = "purple";
      document.querySelector(".sv_next_btn").style.color = "#fff";
      document.querySelector(".sv_prev_btn").style.color = "#fff";
      document.querySelector(".sv_complete_btn").style.background = "#fa6400";
      document.getElementById("jspsych-content").style.width = "100%";
  }

  //Personal background
  var yearBirth = {
    type: jsPsychSurvey,
    pages: [["yearOfBirth"].map(i => generateTextObject(sharedMeasurementsT[i][lang], true, 5, 1))],
    title: sharedMeasurementsT['pleaseAnswer'][lang],
    button_label_next: buttons["continue"][lang],
    button_label_back: buttons["previous"][lang],
    button_label_finish: buttons["continue"][lang],
    on_load: () => {changeStyle()}
  };
  
  var languages = ["Suomi", "العربية", "Bahasa Indonesia", "Bahasa Melayu", "Български", "Català", "Cebuano", "Čeština", "Dansk", "Deutsch", "Eesti", "Ελληνικά", "English", "Español", "Esperanto", "Euskara", "فارسی", "Français", "Galego", "한국어", "Հայերեն", "हिन्दी", "Hrvatski", "Italiano", "עברית", "Қазақша", "Latina", "Lietuvių", "Magyar", "Minangkabau", "Nederlands", "日本語", "Norsk bokmål", "Norsk nynorsk", "Oʻzbekcha/ўзбекча", "Polski", "Português", "Română", "Русский", "Simple English", "Slovenčina", "Slovenščina", "Српски / srpski", "Srpskohrvatski / српскохрватски", "Svenska", "Tiếng Việt", "Türkçe", "Українська", "Volapük", "Winaray", "中文", "Muu"]

  var languageSpoken1 = {
    type: jsPsychSurvey,
    pages: [[generateDropdownObject(sharedMeasurementsT['primaryLanguage'][lang], languages, true)]],
    title: sharedMeasurementsT['pleaseAnswer'][lang],
    button_label_next: buttons["continue"][lang],
    button_label_back: buttons["previous"][lang],
    button_label_finish: buttons["continue"][lang],
    on_load: () => {
      changeStyle()
    }
  };

  var languageSpoken2 = {
    type: jsPsychSurvey,
    pages: [[generateDropdownObject(sharedMeasurementsT['secondaryLanguage'][lang], languages, false)]],
    title: sharedMeasurementsT['pleaseAnswer'][lang],
    button_label_next: buttons["continue"][lang],
    button_label_back: buttons["previous"][lang],
    button_label_finish: buttons["continue"][lang],
    on_load: () => {
      changeStyle()
    }
  };

  var listCountries = ["-", "Finland", "United States", "Aotearoa New Zealand", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Artsakh", "Australia", "Austria", "Azerbaijan", "The Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Democratic Republic of the Congo", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "France", "Gabon", "The Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "South Korea", "Democratic People's Republic of Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "The Netherlands", "Nicaragua", "Niger", "Nigeria", "Niue", "Northern Cyprus", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Sahrawi Arab Democratic Republic", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "São Tomé and Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "Somaliland", "South Africa", "South Ossetia", "Spain", "Sri Lanka", "Sudan", "South Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Transnistria", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]

  var countryFrom = {
    type: jsPsychSurvey,
    pages: [[generateDropdownObject(sharedMeasurementsT['countryFrom'][lang], listCountries, true)]],
    title: sharedMeasurementsT['pleaseAnswer'][lang],
    button_label_next: buttons["continue"][lang],
    button_label_back: buttons["previous"][lang],
    button_label_finish: buttons["continue"][lang],
    on_load: () => {
      changeStyle()
    }
  };

  var yearBirth = {
    type: jsPsychSurveyText,
    preamble: "<div id='preamble'>" + sharedMeasurementsT["yearOfBirth"][lang] + "</div>",
    questions: [
      {prompt: '', name: 'yearOfBirth', required: true},
    ],
    on_load: () => {
      document.getElementById("jspsych-survey-text-form").style.height = '20%'
      document.getElementById("jspsych-survey-text-form").style.width = '80%'
      document.getElementById("jspsych-content").style.height = '100%'
      document.getElementById("preamble").style.fontSize = '0.75em'
      document.getElementById("input-0").type = "date"
      document.getElementById("input-0").autofocus = false
      document.getElementById("input-0").inputmode = 'none'
      document.getElementById("input-0").style.padding = "20px"
      var elelist = document.getElementsByTagName("input");
      for(var i = 0; i < elelist.length; i++){
          elelist[i].blur();
      }
    }
  }

  var genderSurvey = {
    type: jsPsychSurvey,
    pages: [[generateDropdownObject(sharedMeasurementsT["gender"][lang], ["female", "male", "ratherNotSay", "other"].map(i => sharedMeasurementsT[i][lang]), true)]],
    title: sharedMeasurementsT['pleaseAnswer'][lang],
    button_label_next: buttons["continue"][lang],
    button_label_back: buttons["previous"][lang],
    button_label_finish: buttons["continue"][lang],
    on_load: () => {
      changeStyle()
    }
  };

  var otherGenderTrial = {
    type: jsPsychSurvey,
    pages: [["genderOther"].map(i => generateTextObject(sharedMeasurementsT[i][lang], true, 5, 1))],
    title: sharedMeasurementsT['pleaseAnswer'][lang],
    button_label_next: buttons["continue"][lang],
    button_label_back: buttons["previous"][lang],
    button_label_finish: buttons["continue"][lang],
    on_load: () => {changeStyle()}
  }

  var otherGender = {
      timeline: [otherGenderTrial],
      conditional_function: function(){
          var typeQuestion = Object.keys(jsPsych.data.getLastTrialData(1)['trials'][0].response)[0]
          var otherWhich = jsPsych.data.getLastTrialData(1)['trials'][0].response[typeQuestion]
          var showNode = otherWhich == 'Other, what:' || otherWhich == "Muu, mikä:"
          if(showNode){
              return true;
          } else {
              return false;
          }
      }
  }

  var educationSurvey = {
    type: jsPsychSurvey,
    pages: [[generateDropdownObject(sharedMeasurementsT["education"][lang], ["primarySchool", "comprehensiveSchool", "secondaryEducation", "vocationalTraining", "bachelors", "masters", "doctoral", "other"].map(i => sharedMeasurementsT[i][lang]), true)]],
    title: sharedMeasurementsT['pleaseAnswer'][lang],
    button_label_next: buttons["continue"][lang],
    button_label_back: buttons["previous"][lang],
    button_label_finish: buttons["continue"][lang],
    on_load: () => {
      changeStyle()
    }
  };


  var otherEducationTrial = {
    type: jsPsychSurvey,
    pages: [["educationOther"].map(i => generateTextObject(sharedMeasurementsT[i][lang], true, 5, 1))],
    title: sharedMeasurementsT['pleaseAnswer'][lang],
    button_label_next: buttons["continue"][lang],
    button_label_back: buttons["previous"][lang],
    button_label_finish: buttons["continue"][lang],
    on_load: () => {changeStyle()}
  }

  var otherEducation = {
      timeline: [otherEducationTrial],
      conditional_function: function(){
          var typeQuestion = Object.keys(jsPsych.data.getLastTrialData(1)['trials'][0].response)[0]
          var otherWhich = jsPsych.data.getLastTrialData(1)['trials'][0].response[typeQuestion]
          var showNode = otherWhich == 'Other, what:' || otherWhich == "Muu, mikä:"
          if(showNode){
              return true;
          } else {
              return false;
          }
      }
  }

  var educationSurvey = {
    type: jsPsychSurvey,
    pages: [[generateDropdownObject(sharedMeasurementsT["education"][lang], ["primarySchool", "comprehensiveSchool", "secondaryEducation", "vocationalTraining", "bachelors", "masters", "doctoral", "other"].map(i => sharedMeasurementsT[i][lang]), true)]],
    title: sharedMeasurementsT['pleaseAnswer'][lang],
    button_label_next: buttons["continue"][lang],
    button_label_back: buttons["previous"][lang],
    button_label_finish: buttons["continue"][lang],
    on_load: () => {
      changeStyle()
    }
  };

  //Musical background
  var yesNoMusical = ["notAtAlMusical", "notThatMusical", "aBitMusical", "quiteMusical", "veryMusical"].map(i => sharedMeasurementsT[i][lang])
  var neverTen = ["never", "oneTwoYears", "threeFiveYears", "sixNineYears", "tenMoreYears"].map(i => sharedMeasurementsT[i][lang])
  var neverDaily = ["never", "veryRarely", "monthly", "weekly", "daily"].map(i => sharedMeasurementsT[i][lang])

  var promptsMusical = ['howLongSing', 'howOftenSingBefore', 'howOftenSingNow', 'howMuchTuitionSing', 'howLongInstrumentHobby', 'howOftenPlayHobby', 'howOftenPlayNow', 'howMuchTuitionInstrument', 'howLongDanceHobby', 'howLongDanceHobyBefore', 'howOftenDanceNow', 'howMuchTuitionDance', 'howOftenListenMusicNow', 'howMusical']
  var optionsMusical = [neverTen,       neverDaily,           neverDaily,        neverTen,             neverTen,                 neverDaily,          neverDaily,        neverTen,                   neverTen,            neverDaily,               neverDaily,         neverTen,              neverDaily,               yesNoMusical]

  var questionsMusical = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => generateDropdownObject(sharedMeasurementsT[promptsMusical[i]][lang], optionsMusical[i], true))
  var musicalBackgroundSurvey = questionsMusical.map(i => generateManyDropDowns(i, sharedMeasurementsT['pleaseAnswer'][lang]))

  var singConditional = {
      timeline: [musicalBackgroundSurvey[1], musicalBackgroundSurvey[2]],
      conditional_function: function(){
          var typeQuestion = Object.keys(jsPsych.data.getLastTrialData(1)['trials'][0].response)[0]
          var otherWhich = jsPsych.data.getLastTrialData(1)['trials'][0].response[typeQuestion]
          var showNode = otherWhich == 'never' || otherWhich == "en koskaan"
          console.log(otherWhich)
          if(showNode){
              return false;
          } else {
              return true;
          }
      }
  }

  var instrumentConditional = {
      timeline: [musicalBackgroundSurvey[5], musicalBackgroundSurvey[6]],
      conditional_function: function(){
          var typeQuestion = Object.keys(jsPsych.data.getLastTrialData(1)['trials'][0].response)[0]
          var otherWhich = jsPsych.data.getLastTrialData(1)['trials'][0].response[typeQuestion]
          var showNode = otherWhich == 'never' || otherWhich == "en koskaan"
          if(showNode){
              return false;
          } else {
              return true;
          }
      }
  }

  var danceConditional = {
      timeline: [musicalBackgroundSurvey[9], musicalBackgroundSurvey[10]],
      conditional_function: function(){
          var typeQuestion = Object.keys(jsPsych.data.getLastTrialData(1)['trials'][0].response)[0]
          var otherWhich = jsPsych.data.getLastTrialData(1)['trials'][0].response[typeQuestion]
          var showNode = otherWhich == 'never' || otherWhich == "en koskaan"
          if(showNode){
              return false;
          } else {
              return true;
          }
      }
  }
  
  var musicalBackgroundSurvey = [ musicalBackgroundSurvey[0], singConditional, musicalBackgroundSurvey[3], musicalBackgroundSurvey[4], instrumentConditional, musicalBackgroundSurvey[7], musicalBackgroundSurvey[8], danceConditional, musicalBackgroundSurvey[11], musicalBackgroundSurvey[12], musicalBackgroundSurvey[13]]

  //STOMP
  var optionsLikeDislike = ["dislikeStrongly", "dislikeModerately", "dislkikeAlittle", "neutral", "likeALittle", "likeModerately", "likeStrongly"].map(i => sharedMeasurementsT[i][lang])
  var genrePreferences = ["blues", "jazz", "classical", "folk", "rock", "alternative", "heavyMetal", "country", "religious", "pop", "rap", "soul", "electronic"]
  var genreObjects = genrePreferences.map(i => generateDropdownObject(sharedMeasurementsT[i][lang], optionsLikeDislike, true))

  var stompTrials = genreObjects.map(i => generateManyDropDowns(i, sharedMeasurementsT["howMuchLikeGenre"][lang]))

  //Barcelona
  var promptBarcelona = sharedMeasurementsT['question'][lang]
  var optionsBarcelona = ['completelyDisagree', 'somewhatDisagree', 'neitherDisagreeAgree', 'somewhatAgree', 'completelyAgree'].map(i => sharedMeasurementsT[i][lang])
  var questionsBarcelonaLong = ['shareMusic', 'freeNoListen', 'listenEmotion', 'musicCompany', 'dontLikeDance', 'musicMakesMeBond', 'informMyself', 'getEmotional', 'musicCalms', 'musicMakesMeDanceOften', 'lookingNewMusic', 'canBecomeTearful', 'likeToSing', 'musicHelpsChill', 'hummingAlong', 'concertConnected', 'spendQuite', 'sometimesFeelChills', 'musicComforts', 'whenIHearTune'].map(i => sharedMeasurementsT[i][lang])

  var barcelonaObjectsLong = questionsBarcelonaLong.map(i => generateDropdownObject(i, optionsBarcelona, true))
  var barcelonaTrialsLong = barcelonaObjectsLong.map(i => generateManyDropDowns(i, promptBarcelona))

  var questionsBarcelonaShort = ['shareMusic', 'musicMakesMeDanceOften', 'lookingNewMusic', 'musicHelpsChill', 'sometimesFeelChills'].map(i => sharedMeasurementsT[i][lang])

  var barcelonaObjectsShort = questionsBarcelonaShort.map(i => generateDropdownObject(i, optionsBarcelona, true))
  var barcelonaTrialsShort = barcelonaObjectsShort.map(i => generateManyDropDowns(i, promptBarcelona))

  //BMMR
  var bmmrPrompt = sharedMeasurementsT['prompt'][lang]
  var optionsBMMR = ['completelyDisagree', 'somewhatDisagree', 'neitherDisagreeAgree', 'somewhatAgree', 'completelyAgree'].map(i => sharedMeasurementsT[i][lang])
  var bmmrQuestionsLong = ['tiredOut', 'musicHelps', 'listenMusic', 'backgroundAtmosphere', 'listenPerk', 'reallyAngry', 'feelFantastic', 'forgetWorries', 'magnificentExperiences', 'whenBusy', 'musicHelped', 'feelingSadComforts', 'everythingSad', 'whenStressful'].map(i => sharedMeasurementsT[i][lang])
  var bmmrQuestionsShort = ['backgroundAtmosphere', 'listenPerk', 'forgetWorries', 'magnificentExperiences', 'musicHelped', 'feelingSadComforts', 'everythingSad'].map(i => sharedMeasurementsT[i][lang])

  var bmmrObjectsShort = bmmrQuestionsShort.map(i => generateDropdownObject(i, optionsBMMR, true))
  var bmmrTrialsShort = bmmrObjectsShort.map(i => generateManyDropDowns(i, bmmrPrompt))

  var bmmrObjectsLong = bmmrQuestionsLong.map(i => generateDropdownObject(i, optionsBMMR, true))
  var bmmrTrialsLong = bmmrObjectsLong.map(i => generateManyDropDowns(i, bmmrPrompt))

  //Goldsmiths
  var optionsGoldsmith = ['completelyDisagree', 'somewhatDisagree', 'neitherDisagreeAgree', 'somewhatAgree', 'completelyAgree'].map(i => sharedMeasurementsT[i][lang])

  //Singing
  var goldsmithSingingPrompt = sharedMeasurementsT['prompt'][lang]
  var goldsmithSingingQuestionsLong = ["songDontKnow", "ableHit", "likeSinging", "canSing", "afterHearing"].map(i => sharedMeasurementsT[i][lang])
  var goldsmithSingingQuestionsShort = ["songDontKnow", "ableHit", "likeSinging"].map(i => sharedMeasurementsT[i][lang])

  var goldsmithSingingObjectsLong = goldsmithSingingQuestionsLong.map(i => generateDropdownObject(i, optionsGoldsmith, true))
  var goldsmithSingingTrialsLong = goldsmithSingingObjectsLong.map(i => generateManyDropDowns(i, goldsmithSingingPrompt))

  var goldsmithSingingObjectsShort = goldsmithSingingQuestionsShort.map(i => generateDropdownObject(i, optionsGoldsmith, true))
  var goldsmithSingingTrialsShort = goldsmithSingingObjectsShort.map(i => generateManyDropDowns(i, goldsmithSingingPrompt))

  //Perception
  var goldsmithPerceptionPrompt = sharedMeasurementsT['prompt'][lang]
  var goldsmithPerceptionQuestionsLong = ["iCanTell", "iCanTellTune", "iFind", "haveTrouble", "whenISing"].map(i => sharedMeasurementsT[i][lang])
  var goldsmithPerceptionQuestionsShort = ["iCanTell", "iCanTellTune", "iFind"].map(i => sharedMeasurementsT[i][lang])

  var goldsmithPerceptionObjectsLong = goldsmithPerceptionQuestionsLong.map(i => generateDropdownObject(i, optionsGoldsmith, true))
  var goldsmithPerceptionTrialsLong = goldsmithPerceptionObjectsLong.map(i => generateManyDropDowns(i, goldsmithPerceptionPrompt))

  var goldsmithPerceptionObjectsShort = goldsmithPerceptionQuestionsShort.map(i => generateDropdownObject(i, optionsGoldsmith, true))
  var goldsmithPerceptionTrialsShort = goldsmithPerceptionObjectsShort.map(i => generateManyDropDowns(i, goldsmithPerceptionPrompt))
  
  //Goldsmith dancing
  var goldsmithDancingPrompt = sharedMeasurementsT['prompt'][lang]
  var goldsmithDancingQuestionsLong = ["easyControl", "ifSomeone", "whenDance", "iFind", "greatTrack"].map(i => sharedMeasurementsT[i][lang])
  var goldsmithDancingQuestionsShort = ["easyControl", "ifSomeone", "whenDance"].map(i => sharedMeasurementsT[i][lang])

  var goldsmithDancingObjectsLong = goldsmithDancingQuestionsLong.map(i => generateDropdownObject(i, optionsGoldsmith, true))
  var goldsmithDancingTrialsLong = goldsmithDancingObjectsLong.map(i => generateManyDropDowns(i, goldsmithDancingPrompt))

  var goldsmithDancingObjectsShort = goldsmithDancingQuestionsShort.map(i => generateDropdownObject(i, optionsGoldsmith, true))
  var goldsmithDancingTrialsShort = goldsmithDancingObjectsShort.map(i => generateManyDropDowns(i, goldsmithDancingPrompt))

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

  var timelineBasic = [agreement1, agreement2, frontPageShared, yearBirth, countryFrom, genderSurvey, otherGender, educationSurvey, otherEducation, languageSpoken1, languageSpoken2]

  var timelineShort = [agreement1, agreement2, frontPageShared, 
                       between1,
                       yearBirth,
                       countryFrom,
                       genderSurvey,
                       otherGender,
                       educationSurvey, 
                       otherEducation, 
                       between2,
                       musicalBackgroundSurvey,
                       between3,
                       stompTrials,
                       between4,
                       barcelonaTrialsShort,
                       bmmrTrialsShort,
                       between5,
                       goldsmithPerceptionTrialsShort,
                       between6,
                       goldsmithSingingTrialsShort,
                       between7,
                       goldsmithDancingTrialsShort,
                       messageFinishSharedMeasures].flat(100)

  var timelineLong = [agreement1, agreement2, frontPageShared, 
                      between1,
                      yearBirth,
                      countryFrom,
                      genderSurvey,
                      otherGender,
                      educationSurvey, 
                      otherEducation, 
                      languageSpoken1,
                      languageSpoken2,
                      between2,
                      musicalBackgroundSurvey,
                      between3,
                      stompTrials,
                      between4,
                      barcelonaTrialsLong,
                      bmmrTrialsLong,
                      between5,
                      goldsmithPerceptionTrialsLong,
                      between6,
                      goldsmithSingingTrialsLong,
                      between7,
                      goldsmithDancingTrialsLong,
                      messageFinishSharedMeasures].flat(100)

  var versionsShared = {
    short: timelineShort,
    basic: timelineBasic
  }

  if(!version){
    return(timelineLong)
  } else {
    return(versionsShared[version])
  }

}
