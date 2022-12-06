var preloadTest = {
    type: jsPsychPreload,
    audio: ['../../songs/movementTapAudio/elPesebre.mp3']
}
var requirements = {
  type: jsPsychInstructions,
  pages: recurring[12].map(i=>[i[lang]]), 
  button_label_next: buttons[0][lang],
  button_label_previous: buttons[1][lang],
  show_clickable_nav: true
};

var soundCheck = {
    type: jsPsychAudioButtonResponse,
    stimulus: '../../songs/movementTapAudio/elPesebre.mp3',
    prompt: initialInstructions[0][0][lang],
    choices: ['Continue'],
    on_load: function(){
      document.getElementById("jspsych-content").style.fontSize = '1.3em'
      document.getElementById("jspsych-audio-button-response-btngroup").style.marginTop = "15px"
    },
    on_finish: function(){
      document.getElementById("jspsych-content").style.fontSize = '2em'
    }
}

var soundCheck2 = {
    type: jsPsychAudioButtonResponse,
    stimulus: '../../songs/movementTapAudio/modifiedAudio/name__1 - 3-11 Porter - Surround me with your love - Mental Overdrive remix__stretchfactor__0_78195__1_04__1_3.mp3',
    prompt: "Sound check 2<br>Can you hear?",
    choices: ['Continue'],
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

var generalIntroWrap = [preloadTest, requirements, soundCheck, gettingHelp, soundCheck2]
