function generateGeneralIntroWrap(lang, subBattery){

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

  var preloadTest = {
      type: jsPsychPreload,
      audio: ['./songs/movementTapAudio/elPesebre.mp3'],
      images: ['./images/instructions/androidInstructions0.png', './images/instructions/androidInstructions1.png', './images/instructions/androidInstructions2.png', './images/instructions/iosInstruction0.png', './images/instructions/iosInstruction1.png', './images/instructions/iosInstruction2.png', './images/purse.svg', './images/noBluetooth.svg', './images/instructions/iosInstruction0.png', './images/instructions/iosInstruction1.png', './images/instructions/iosInstruction2.png', './images/muteButton.png'],
      auto_preload: false,
  }

  var requirementsRhythm = {
    type: jsPsychInstructions,
    pages: [1, 3, 4, 17].map(i => recurring["instruction" + i][lang]), 
    button_label_next: buttons["next"][lang],
    button_label_previous: buttons["previous"][lang],
    show_clickable_nav: true
  };

  var requirementsMovement = {
    type: jsPsychInstructions,
    pages: [1, 2, 4].map(i => recurring["instruction" + i][lang]), 
    button_label_next: buttons["next"][lang],
    button_label_previous: buttons["previous"][lang],
    show_clickable_nav: true
  };

  var lIOS = {
    type: jsPsychInstructions,
    pages: [5, 6, 7, 8, 9, 10].map(i=> recurring["instruction" + i][lang]), 
    button_label_next: buttons["next"][lang],
    button_label_previous: buttons["previous"][lang],
    show_clickable_nav: true
  };

  var lAndroid = {
    type: jsPsychInstructions,
    pages: [5, 12, 13, 14, 15, 16].map(i=> recurring["instruction" + i][lang]), 
    button_label_next: buttons["next"][lang],
    button_label_previous: buttons["previous"][lang],
    show_clickable_nav: true
  };

  var lockIOS = {
    timeline: [lIOS],
    conditional_function: function(){
      var OS = getMobileOperatingSystem()
      return OS == "iOS"
    }
  }

  var lockAndroid = {
    timeline: [lAndroid],
    conditional_function: function(){
      var OS = getMobileOperatingSystem()
      return (OS == "Android" || OS == "unknown")
    }
  }

  var context; //Defining global context to get RT from modified audio-button response
  var tAudioIOS = {
    type: jsPsychAudioButtonResponse,
    stimulus: './songs/movementTapAudio/elPesebre.mp3',
    choices: [buttons["continue"][lang]],
    post_trial_gap: 800,
    //trial_duration: 1000, //simuBack
    prompt: initialInstructions["canYouHear2"][lang] + '<img src="./images/muteButton.png" id="muteButton"></img>',
    on_load: function(){
    }
  };

  var tAudioAndroid = {
    type: jsPsychAudioButtonResponse,
    stimulus: './songs/movementTapAudio/elPesebre.mp3',
    //trial_duration: 1000, //simuBack
    choices: [buttons["continue"][lang]],
    post_trial_gap: 800,
    prompt: initialInstructions["canYouHear"][lang],
    on_load: function(){
      document.getElementById("audioPrompt").style.margin = "auto"
    }
  };

  var testAudioIOS = {
    timeline: [tAudioIOS],
    conditional_function: function(){
      var OS = getMobileOperatingSystem()
      return (OS == "iOS" || OS == "unknown")
    }
  }

  var testAudioAndroid = {
    timeline: [tAudioAndroid],
    conditional_function: function(){
      var OS = getMobileOperatingSystem()
      return OS === "Android"
    }
  }

  var gettingHelp = {
    type: jsPsychHtmlButtonResponse,
    stimulus: initialInstructions["gettingHelp"][lang],
    choices: [initialInstructions["no"][lang], initialInstructions["yes"][lang]],
    prompt: '',
    on_load: function(){
      document.getElementById("jspsych-html-button-response-btngroup").getElementsByClassName("jspsych-btn")[1].style.background = "purple"
    },
  };

  var howDifficult = {
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: recurring["howEasy"][lang] + "<div id='labelsWrapperLikert'><div id='leftLabel'>" + recurring["veryHard"][lang] + "</div><div id='rightLabel'>" + recurring["veryEasy"][lang] + "</div></div>",
      labels: [1, 2, 3, 4, 5].map(i => "<div id='labelLikert'>" + i + "</div>"),
    }],
    randomize_question_order: false,
    on_finish: function(data){
      var last2 = jsPsych.data.get().last(3);
      var songBeingRated = last2['trials'][0].stimulus
      data.song = songBeingRated
    },
    on_load: function(){
      document.querySelector(".jspsych-survey-likert-statement").style.fontSize = '1em'
    }
  };

  var messageEndTask = {
    type: jsPsychHtmlButtonResponse,
    prompt: recurring["endTask1"][lang],
    choices: [],
    trial_duration: 3000,
    stimulus: '',
    on_finish: function(){
      window.onbeforeunload = function () {}
    }
  };

  var generalIntroEmotion = [[preloadTest, testAudioIOS, testAudioAndroid, gettingHelp]];
  var generalIntroWrapRhythm = [[agreement1, agreement2, preloadTest, requirementsRhythm, lockIOS, lockAndroid, testAudioIOS, testAudioAndroid, gettingHelp]];
  var generalIntroWrapMovement = [[agreement1, agreement2, preloadTest, requirementsMovement, lockIOS, lockAndroid, testAudioIOS, testAudioAndroid, gettingHelp]];
  var generalIntroWrapMBEMA = [[preloadTest, testAudioIOS, testAudioAndroid, gettingHelp]];
  
  if(subBattery == "emotion"){
    return(generalIntroEmotion)
  } 
  if(subBattery == "rhythm"){
    return(generalIntroWrapRhythm)
  }
  if(subBattery == "mbema"){
    return(generalIntroWrapMBEMA)
  }
  else {
    return(generalIntroWrapMovement) }
}
