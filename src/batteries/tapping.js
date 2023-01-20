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

var randomMetronome = random(0, songKeys['11'].length -1)
var randomMetronome = songKeys['11'][randomMetronome]

var songsToPreload = [randomElPesebreSong, randomMetronome]
var songPaths = '../../songs/movementTapAudio/modifiedAudio/'
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
    choices: ['Tap here'],
    stimulus: '../../songs/movementTapAudio/silence.wav',
    trial_duration: 60000,
    button_html: '<button type="button" ' + eventTypeStart + '="buttonDown()" id="tappingButton"><p id="customText" style="font-size:15vw; color: white;">' + tapping[4][0][lang] + '</p></button>',
    response_ends_trial: false,
}

var trialTapping1 = {
    type: jsPsychAudioButtonResponse,
    choices: ['Tap here'],
    stimulus: '../../songs/movementTapAudio/modifiedAudio/' + randomMetronome,
    trial_duration: 63000,
    button_html: '<button type="button" ' + eventTypeStart + '="buttonDown()" id="tappingButton"><p id="customText" style="font-size:15vw; color: white;">' + tapping[4][0][lang] + '</p></button>',
    response_ends_trial: false,
}
 
var trialTapping3 = {
    type: jsPsychAudioButtonResponse,
    choices: ['Tap here'],
    stimulus: '../../songs/movementTapAudio/modifiedAudio/' + randomElPesebreSong,
    trial_duration: 63000,
    button_html: '<button type="button" ' + eventTypeStart + '="buttonDown()" id="tappingButton"><p id="customText" style="font-size:15vw; color: white;">' + tapping[4][0][lang] + '</p></button>',
    response_ends_trial: false,
}

var tappingTimeline = [[frontPage, preloadSongs2, instruction0, trialTapping0, messageEndTask, howDifficult, instruction1, trialTapping1, messageEndTask, howDifficult, instruction3, trialTapping3, messageEndTask, howDifficult]];
