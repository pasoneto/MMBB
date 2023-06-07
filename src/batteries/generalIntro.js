function generateGeneralIntroWrap(lang, subBattery){

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
    prompt: initialInstructions[0][4][lang] + '<img src="./images/muteButton.png" id="muteButton"></img>',
    on_load: function(){
      //document.querySelector(".jspsych-content-wrapper").style.justifyContent = "center"
      //document.getElementById("jspsych-content").style.height = "85vh"
      //document.getElementById("jspsych-content").style.justifyContent = "start"
      //document.getElementById("jspsych-content").style.margin = "0"
      document.getElementById("jspsych-content").style.fontSize = "1em"
    }
  };

  var tAudioAndroid = {
    type: jsPsychAudioButtonResponse,
    stimulus: './songs/movementTapAudio/elPesebre.mp3',
    choices: [buttons["continue"][lang]],
    prompt: initialInstructions[0][0][lang],
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
    stimulus: initialInstructions[0][3][lang],
    choices: [initialInstructions[0][2][lang], initialInstructions[0][1][lang]],
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
  var generalIntroWrapRhythm = [[preloadTest, requirementsRhythm, lockIOS, lockAndroid, testAudioIOS, testAudioAndroid, gettingHelp]];
  var generalIntroWrapMovement = [[preloadTest, requirementsMovement, lockIOS, lockAndroid, testAudioIOS, testAudioAndroid, gettingHelp]];
  
  if(subBattery == "emotion"){
    return(generalIntroEmotion)
  } 
  if(subBattery == "rhythm"){
    return(generalIntroWrapRhythm)
  }
  else {
    return(generalIntroWrapMovement)
  }
}
