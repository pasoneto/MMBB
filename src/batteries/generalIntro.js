const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var lang = urlParams.get('lang')
if(lang === null){
  var lang = "eng"
}

var soundCheck = {
    type: jsPsychAudioButtonResponse,
    stimulus: '../../songs/movementTapAudio/elPesebre.mp3',
    prompt: initialInstructions[0][0][lang],
    choices: ['Continue'],
}

var gettingHelp = {
  type: jsPsychHtmlButtonResponse,
  stimulus: initialInstructions[0][3][lang],
  choices: [initialInstructions[0][1][lang], initialInstructions[0][2][lang]],
  prompt: ''
};
