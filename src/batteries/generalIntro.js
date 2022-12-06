var requirements = {
  type: jsPsychInstructions,
  pages: recurring[12].map(i=>[i[lang]]), 
  button_label_next: buttons[0][lang],
  button_label_previous: buttons[1][lang],
  show_clickable_nav: true
};

var gettingHelp = {
  type: jsPsychHtmlButtonResponse,
  stimulus: initialInstructions[0][3][lang],
  choices: [initialInstructions[0][2][lang], initialInstructions[0][1][lang]],
  prompt: '',
  on_load: function(){
    document.getElementById("jspsych-html-button-response-btngroup").getElementsByClassName("jspsych-btn")[1].style.background = "purple"
  },
};

var frontPage = {
    type: jsPsychInstructions,
    pages: tapping[5].map(i=>i[lang]),
    button_label_next: "Next",
    button_label_previous: "Previous",
    show_clickable_nav: true,
}

var instruction0 = {
    type: jsPsychInstructions,
    pages: tapping[0].map(i=>i[lang]),
    button_label_next: "Next",
    button_label_previous: "Previous",
    show_clickable_nav: true,
}

var instruction1 = {
    type: jsPsychInstructions,
    pages: tapping[1].map(i=>i[lang]),
    button_label_next: "Next",
    button_label_previous: "Previous",
    show_clickable_nav: true,
}

var instruction2 = {
    type: jsPsychInstructions,
    pages: tapping[2].map(i=>i[lang]),
    button_label_next: "Next",
    button_label_previous: "Previous",
    show_clickable_nav: true,
}

var instruction3 = {
    type: jsPsychInstructions,
    pages: tapping[3].map(i=>i[lang]),
    button_label_next: "Next",
    button_label_previous: "Previous",
    show_clickable_nav: true,
}

function buttonDown(){
      document.getElementById("tappingButton").innerHTML = '<p id="customText">--</p>'
      sleep(10).then((r)=>{
        document.getElementById("tappingButton").innerHTML = '<p id="customText">' + tapping[4][0][lang] + '</p>'
      })
}

var randomElPesebreIndex = random(0, songKeys['7'].length -1)
var randomElPesebreSong = songKeys['7'][randomElPesebreIndex]

var randomMetronome = random(0, songKeys['8'].length -1)
var randomMetronome = songKeys['8'][randomMetronome]

var songsToPreload = [randomElPesebreSong, randomMetronome]
var songPaths = '../../songs/movementTapAudio/modifiedAudio/'
var pathsToPreload = songsToPreload.map(i=>songPaths+i)
var preloadSongs = {
  type: jsPsychPreload,
  audio: pathsToPreload 
}   
console.log(randomElPesebreSong)
console.log(randomMetronome)

var trialTapping1 = {
    type: jsPsychAudioButtonResponse,
    choices: ['Tap here'],
    stimulus: '../../songs/movementTapAudio/modifiedAudio/' + randomMetronome,
    trial_duration: 140000,
    button_html: '<button type="button" ' + eventTypeStart + '="buttonDown()" id="tappingButton"><p id="customText" style="font-size:15vw; color: white;">' + tapping[4][0][lang] + '</p></button>',
    response_ends_trial: false,
}
 









var lockScreen = {
  type: jsPsychHtmlButtonResponse,
  stimulus: initialInstructions[0][3][lang],
  choices: [initialInstructions[0][2][lang], initialInstructions[0][1][lang]],
  prompt: '',
  on_load: function(){
    document.getElementById("jspsych-html-button-response-btngroup").getElementsByClassName("jspsych-btn")[1].style.background = "purple"
  },
};

var howDifficult = {
    type: jsPsychHtmlSliderResponse,
    stimulus: recurring[9][lang],
    require_movement: true,
    labels: [recurring[10][lang], recurring[11][lang]],
    on_load: function(){
      document.getElementById("label0").style = ''
      document.getElementById("label1").style = ''
    },
};

var messageEndTask = {
  type: jsPsychHtmlButtonResponse,
  prompt: recurring[3][lang],
  choices: [],
  trial_duration: 3000,
  stimulus: '',
  on_finish: function(){
    window.onbeforeunload = function () {}
  }
};

var generalIntroWrap = [requirements, gettingHelp, frontPage, preloadSongs, instruction0, trialTapping1]
