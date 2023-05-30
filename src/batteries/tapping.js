function generateTappingTimeline(lang){
  var frontPage = {
      type: jsPsychInstructions,
      pages: [tapping["openPage"][lang]],
      button_label_next: "Next",
      button_label_previous: "Previous",
      show_clickable_nav: true,
  }

  var instruction0 = {
      type: jsPsychInstructions,
      pages: [1, 2, 3].map(i=> tapping["instruction" + i][lang]),
      button_label_next: "Next",
      button_label_previous: "Previous",
      show_clickable_nav: true,
  }

  var instruction1 = {
      type: jsPsychInstructions,
      pages: [4, 5, 6].map(i=> tapping["instruction" + i][lang]),
      button_label_next: "Next",
      button_label_previous: "Previous",
      show_clickable_nav: true,
  }

  var instruction2 = {
      type: jsPsychInstructions,
      pages: [7, 8, 9].map(i=> tapping["instruction" + i][lang]),
      button_label_next: "Next",
      button_label_previous: "Previous",
      show_clickable_nav: true,
  }

  var instruction3 = {
      type: jsPsychInstructions,
      pages: [10, 11].map(i=> tapping["instruction" + i][lang]),
      button_label_next: "Next",
      button_label_previous: "Previous",
      show_clickable_nav: true,
  }

  var randomElPesebreIndex = random(0, songKeys['7'].length -1)
  var randomElPesebreSong = songKeys['7'][randomElPesebreIndex]

  var randomMetronome = random(0, songKeys['11'].length -1)
  var randomMetronome = songKeys['11'][randomMetronome]

  var songsToPreload = [randomElPesebreSong, randomMetronome]
  var songPaths = './songs/movementTapAudio/modifiedAudio/'
  var pathsToPreload = songsToPreload.map(i=>songPaths+i)
  var preloadSongs2 = {
    type: jsPsychPreload,
    audio: pathsToPreload,
    auto_preload: false,
  }   
  console.log(randomElPesebreSong)
  console.log(randomMetronome)

  var trialTapping0 = {
      type: jsPsychAudioButtonResponse,
      choices: [tapping["tapHere"][lang]],
      stimulus: './songs/movementTapAudio/silence.wav',
      prompt: '<div id="recordingText">' + tapping["recording"][lang] + '</div>',
      trial_duration: 30000,
      margin_horizontal: '0px',
      button_html: '<button type="button" ' + ' id="tappingButton"><p id="customText" style="font-size:15vw; color: white;">' + tapping["tapHere"][lang] + '</p></button>',
      response_ends_trial: false,
      on_load: function(){
        document.querySelector(".jspsych-display-element").style.border = "red"
        document.querySelector(".jspsych-display-element").style.borderStyle = "solid"
        document.querySelector(".jspsych-display-element").style.borderWidth = "3px"
      },
      on_finish: function(){
        document.querySelector(".jspsych-display-element").style.border = "none"
        document.querySelector(".jspsych-display-element").style.borderStyle = "none"
        document.querySelector(".jspsych-display-element").style.borderWidth = "none"
      }
  }

  var trialTapping1 = {
      type: jsPsychAudioButtonResponse,
      choices: [tapping["tapHere"][lang]],
      prompt: '<div id="recordingText">' + tapping["recording"][lang] + '</div>',
      stimulus: './songs/movementTapAudio/modifiedAudio/' + randomMetronome,
      trial_duration: 63000,
      margin_horizontal: '0px',
      button_html: '<button type="button" ' + ' id="tappingButton"><p id="customText" style="font-size:15vw; color: white;">' + tapping["tapHere"][lang] + '</p></button>',
      response_ends_trial: false,
      on_load: function(){
        document.querySelector(".jspsych-display-element").style.border = "red"
        document.querySelector(".jspsych-display-element").style.borderStyle = "solid"
        document.querySelector(".jspsych-display-element").style.borderWidth = "5px"
      },
      on_finish: function(){
        document.querySelector(".jspsych-display-element").style.border = "none"
        document.querySelector(".jspsych-display-element").style.borderStyle = "none"
        document.querySelector(".jspsych-display-element").style.borderWidth = "none"
      }
  }
   
  var trialTapping3 = {
      type: jsPsychAudioButtonResponse,
      choices: [tapping["tapHere"][lang]],
      prompt: '<div id="recordingText">' + tapping["recording"][lang] + '</div>',
      stimulus: './songs/movementTapAudio/modifiedAudio/' + randomElPesebreSong,
      trial_duration: 63000,
      margin_horizontal: '0px',
      button_html: '<button type="button" ' + ' id="tappingButton"><p id="customText" style="font-size:15vw; color: white;">' + tapping["tapHere"][lang] + '</p></button>',
      response_ends_trial: false,
      on_load: function(){
        document.querySelector(".jspsych-display-element").style.border = "red"
        document.querySelector(".jspsych-display-element").style.borderStyle = "solid"
        document.querySelector(".jspsych-display-element").style.borderWidth = "5px"
      },
      on_finish: function(){
        document.querySelector(".jspsych-display-element").style.border = "none"
        document.querySelector(".jspsych-display-element").style.borderStyle = "none"
        document.querySelector(".jspsych-display-element").style.borderWidth = "none"
      }
  }

  var howDifficult = {
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: recurring["howEasy"][lang] + "<div id='labelsWrapperLikert'><div id='leftLabel'>" + recurring["veryEasy"][lang] + "</div><div id='rightLabel'>" + recurring["veryHard"][lang] + "</div></div>",  
      labels: [1, 2, 3, 4, 5].map(i => "<div id='labelLikert'>" + i + "</div>"),
    }],
    randomize_question_order: false,
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

  var tappingTimeline = [[frontPage, preloadSongs2, instruction0, trialTapping0, messageEndTask, howDifficult, instruction1, trialTapping1, messageEndTask, howDifficult, instruction3, trialTapping3, messageEndTask, howDifficult]];

  return(tappingTimeline)
}
