//first stimulus batch
// Determining order of presentation of songs to sort.
var songNames = ["Surround&nbspme&nbspwith&nbspyour&nbsplove&nbsp-&nbspPorter",
                 "Simple&nbspLife&nbsp-&nbspSeeb",
                 "Airborne&nbspRobots&nbsp-&nbspF-777",
                 "Edge&nbsp-&nbspRezz",
                 "Discovered&nbsp-&nbspBeats&nbspAntique", 
                 "Cafe&nbspTropical&nbsp-&nbspJohannes&nbspLinstead", 
                 "Tebel&nbspRousin&nbsp-&nbspHypnotic&nbspBrass&nbspEnsamble", 
                 "Primadonna&nbsp-&nbspSkogsrå",
                 "Ketto&nbsp-&nbspBonobo",
                 "Slow&nbspAcid&nbsp-&nbspCalvin&nbspHarris", 
                 "Temptation&nbsp-&nbspDala"] 

var songBPMS = ["Surround&nbspme&nbspwith&nbspyour&nbsplove&nbsp-&nbspPorter",
                 "Simple&nbspLife&nbsp-&nbspSeeb",
                 "Airborne&nbspRobots&nbsp-&nbspF-777",
                 "Edge&nbsp-&nbspRezz",
                 "Discovered&nbsp-&nbspBeats&nbspAntique", 
                 "Cafe&nbspTropical&nbsp-&nbspJohannes&nbspLinstead", 
                 "Tebel&nbspRousin&nbsp-&nbspHypnotic&nbspBrass&nbspEnsamble", 
                 "Primadonna&nbsp-&nbspSkogsrå",
                 "Ketto&nbsp-&nbspBonobo",
                 "Slow&nbspAcid&nbsp-&nbspCalvin&nbspHarris", 
                 "Temptation&nbsp-&nbspDala"] 

function PlaySound(song) {
    if(song.paused){
        song.play();
        const color_change = 'blue';
      } else{
        song.pause()
        song.currentTime = 0;
      }
}

function othersStop(songList) {
  for(i in songList){
    songList[i].pause()
    songList[i].currentTime = 0;
  }
}

var chosenSong;
function setNextSong(sourceSound){
  window.chosenSong = sourceSound;
  console.log(window.chosenSong)
}

function displaySongName(songName){
  document.getElementById("songName").innerHTML = songName
}

var listSongs;
var songCodes;
var albumCovers;
var prompt_songs = function(lang){
      window.listSongs = [];
      window.songCodes = [];
      window.albumCovers = [];
      for (let i = 1; i < 7; i++) {
          var s = new Audio();
          s.src = './songs/movementTapAudio/vitrineSongs/' + i + '.mp3';
          listSongs.push(s)
          songCodes.push(i)
          albumCovers.push('./songs/movementTapAudio/imageAlbums/' + i + '.jpg');
      }
      html = "<div id='songName'>" + movement["instruction21"][lang] + "</div>"
      html += "<div id='buttonsChooseWrap'>"
      for(i in listSongs){
        var songPath = listSongs[i].src
        var songName = songNames[i]
        var songCode = songCodes[i]
        var sNumber = Number(i) + 1 
        html += "<audio></audio> <button id='buttonSongItem' name='buttonMusic' onclick=" + "othersStop(listSongs);PlaySound(listSongs[" + i + "]);changeColor(this);setNextSong('" + songCode + "');> " + movement["song"][lang] + " " + sNumber + "</button>"
      }
      html += "</div>" //Close buttonsChooseWrap
      html += "</div>"
      return(html)
};

function changeColor(btn) {
    var buttonsList = document.getElementsByName("buttonMusic");
    for (let i = 0; i < buttonsList.length; i++) {
      buttonsList[i].style.backgroundColor = "lightgray"
    }

    if(btn.style.backgroundColor !== 'lightblue'){
        btn.style.backgroundColor = "lightblue";
        } else{
        btn.style.backgroundColor = "lightgray";
      }
}

function generateMovementTimeline(lang, version){

  var randomChosenSong;
  var chooseSongs = {
    type: jsPsychHtmlSongSelectorResponse,
    stimulus: '',
    choices: [buttons["next"][lang]],
    on_start: function(trial){
      trial.stimulus = prompt_songs(lang)
      //simuBack
      //setNextSong(1)
    },
    on_finish: function(){
      for(k in window.listSongs){
        window.listSongs[k].pause()
      }
      console.log(window.chosenSong)
      var chosenSongCode = window.chosenSong
      var randomChosenIndex = random(0, songKeys[chosenSongCode].length -1)
      window.randomChosenSong = songKeys[chosenSongCode][randomChosenIndex]
      console.log(window.randomChosenSong)
    },
  };

  var promptAcc = {
      type: jsPsychInstructions,
      pages: [movement["instruction1"][lang]],
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var promptAccel = {
    timeline: [promptAcc],
    conditional_function: function(){
      var OS = getMobileOperatingSystem()
      return OS == "iOS"
    }
  }

  var loadAccel = {
      type: jsPsychAudioKeyboardResponse,
      stimulus: './songs/movementTapAudio/silence.wav',
      prompt: movement["accessAcelerometer"][lang] + '<br><img id="logoLoading" src="./images/loading2.gif">',
      trial_duration: 3000,
    //trial_duration: 1000, //simuBack
      choices: ["NO_KEYS"],
      extensions: [
        {type: jsPsychExtensionAccelerometer }
      ],
  }

  var instruction0a = {
      type: jsPsychInstructions,
      pages: ['instruction2', 'instruction3'].map(i => movement[i][lang]),
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }


  var instruction0b = {
      type: jsPsychInstructions,
      pages: [4, 5, 6, 7, 8, 9, 10, 11].map(i => movement["instruction" + i][lang]),
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var trial_in_fullscreen = {
    type: jsPsychFullscreen,
    message: "<div id='fullscreenCommand'>" + movement["instruction12"][lang] + "</div>",
    button_label: recurring['continue'][lang],
    fullscreen_mode: true
  }

  var instruction1 = {
      type: jsPsychInstructions,
      pages: ["14", "15", "16", "17", "17b"].map(i => movement["instruction" + i][lang]),
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var instruction2 = {
      type: jsPsychInstructions,
      pages: [19, 20].map(i => movement["instruction" + i][lang]),
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var instruction3 = {
      type: jsPsychInstructions,
      pages: [21, 22, 23, 24, 25, 26].map(i => movement["instruction" + i][lang]),
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true
  }

  var familiarityRating = {
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: movement["howFamiliar"][lang] + "<div id='labelsWrapperLikert'><div id='leftLabel'>" + movement["notAtAll"][lang] + "</div><div id='rightLabel'>" + movement["veryMuch"][lang] + "</div></div>",  
      labels: [1, 2, 3, 4, 5].map(i => "<div id='labelLikert'>" + i + "</div>"),
    }],
    button_label: recurring['continue'][lang],
    randomize_question_order: false,
    on_finish: function(data){
      var last2 = jsPsych.data.get().last(4);
      var songBeingRated = last2['trials'][0].stimulus
      data.song = songBeingRated
    },
    on_load: function(){
      document.querySelector(".jspsych-survey-likert-statement").style.fontSize = '1em'
    }
  };

  var knowThisSong = {
    type: jsPsychSurveyMultiChoice,
    questions: [
      {
        prompt: movement["haveYouHeardThisSong"][lang], 
        name: 'knowThisSongQuestion', 
        options: [initialInstructions["yes"][lang], initialInstructions["no"][lang], initialInstructions["idk"][lang]],
        required: true
      }, 
    ],
    button_label: recurring['continue'][lang],
    on_finish: function(data){
      var last2 = jsPsych.data.get().last(7);
      var songBeingRated = last2['trials'][0].stimulus
      data.song = songBeingRated
      console.log(songBeingRated)
      data.stimulus = "knowThisSong"
    },
    on_load: function(){
      document.getElementById("jspsych-survey-multi-choice-0").style.marginTop = "0em"
    }
  };

  var likingBeatRating = {
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: movement["howMuchLikeBeat"][lang] + "<div id='labelsWrapperLikert'><div id='leftLabel'>" + movement["notAtAll"][lang] + "</div><div id='rightLabel'>" + movement["veryMuch"][lang] + "</div></div>",  
      labels: [1, 2, 3, 4, 5].map(i => "<div id='labelLikert'>" + i + "</div>"),
    }],
    button_label: recurring['continue'][lang],
    randomize_question_order: false,
    on_finish: function(data){
      var last2 = jsPsych.data.get().last(4);
      var songBeingRated = last2['trials'][0].stimulus
      data.song = songBeingRated
    },
    on_load: function(){
      document.querySelector(".jspsych-survey-likert-statement").style.fontSize = '1em'
    }
  };

  var likingRating = {
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: movement["howMuchLikeSong"][lang] + "<div id='labelsWrapperLikert'><div id='leftLabel'>" + movement["notAtAll"][lang] + "</div><div id='rightLabel'>" + movement["veryMuch"][lang] + "</div></div>",  
      labels: [1, 2, 3, 4, 5].map(i => "<div id='labelLikert'>" + i + "</div>"),
    }],
    button_label: recurring['continue'][lang],
    randomize_question_order: false,
    on_finish: function(data){
      var last2 = jsPsych.data.get().last(5);
      var songBeingRated = last2['trials'][0].stimulus
      data.song = songBeingRated
    },
    on_load: function(){
      document.querySelector(".jspsych-survey-likert-statement").style.fontSize = '1em'
    }
  };

  var grooveRatingBeat = {
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: movement["howMuchMoveSong"][lang] + "<div id='labelsWrapperLikert'><div id='leftLabel'>" + movement["notAtAll"][lang] + "</div><div id='rightLabel'>" + movement["veryMuch"][lang] + "</div></div>",  
      labels: [1, 2, 3, 4, 5].map(i => "<div id='labelLikert'>" + i + "</div>"),
    }],
    button_label: recurring['continue'][lang],
    randomize_question_order: false,
    on_finish: function(data){
      var last2 = jsPsych.data.get().last(5);
      var songBeingRated = last2['trials'][0].stimulus
      data.song = songBeingRated
    },
    on_load: function(){
      document.querySelector(".jspsych-survey-likert-statement").style.fontSize = '1em'
    }
  };

  var grooveRating = {
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: movement["howMuchMoveSong"][lang] + "<div id='labelsWrapperLikert'><div id='leftLabel'>" + movement["notAtAll"][lang] + "</div><div id='rightLabel'>" + movement["veryMuch"][lang] + "</div></div>",  
      labels: [1, 2, 3, 4, 5].map(i => "<div id='labelLikert'>" + i + "</div>"),
    }],
    button_label: recurring['continue'][lang],
    randomize_question_order: false,
    on_finish: function(data){
      var last2 = jsPsych.data.get().last(6);
      var songBeingRated = last2['trials'][0].stimulus
      data.song = songBeingRated
    },
    on_load: function(){
      document.querySelector(".jspsych-survey-likert-statement").style.fontSize = '1em'
    }
  };

  var howDifficultMovement = {
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: recurring["howEasy"][lang] + "<div id='labelsWrapperLikert'><div id='leftLabel'>" + recurring["veryHard"][lang] + "</div><div id='rightLabel'>" + recurring["veryEasy"][lang] + "</div></div>",  
      labels: [1, 2, 3, 4, 5].map(i => "<div id='labelLikert'>" + i + "</div>"),
    }],
    button_label: recurring['continue'][lang],
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

  var phonePocket = {
      type: jsPsychAudioKeyboardResponse,
      stimulus: './songs/movementTapAudio/instructionsAudio/phonePocket' + lang.toUpperCase() + '.mp3',
      prompt: [movement["instruction13"][lang]],
      trial_duration: 7000,
      //trial_duration: 1000, //simuBack
      choices: ["NO_KEYS"],
  }

  var countDown = {
      type: jsPsychAudioKeyboardResponse,
      stimulus: './songs/movementTapAudio/instructionsAudio/countdown' + lang.toUpperCase() + '.mp3',
      prompt: "<img id='tableSVG' src='./images/voiceSVG.svg'></img>",
      trial_duration: 6500,
      //trial_duration: 1000, //simuBack
      choices: ["NO_KEYS"],
      on_load: function(){
        document.getElementById("tableSVG").style.marginTop = 0
      }

  }

  var pickUpPhone = {
      type: jsPsychAudioKeyboardResponse,
      stimulus: './songs/movementTapAudio/instructionsAudio/pickPhone' + lang.toUpperCase() + '.mp3',
      prompt: "<img id='tableSVG' src='./images/voiceSVG.svg'></img>",
      choices: ["NO_KEYS"],
      trial_duration: 10000,
      //trial_duration: 1000, //simuBack
      on_load: function(){
        document.getElementById("tableSVG").style.marginTop = 0
      }
  }

  var trialAccelerometer1 = {
      type: jsPsychAudioKeyboardResponse,
      stimulus: './songs/movementTapAudio/silence.wav',
      prompt: "<img id='pocket' src='./images/pocket.svg'></img>",
      trial_duration: 30000,
      //trial_duration: 1000, simuBack
      choices: ["NO_KEYS"],
      extensions: [
        {type: jsPsychExtensionAccelerometer }
      ],
      on_load: function(){
        document.getElementById("pocket").style.marginTop = 0
      }

  }

  var randomMetronomeIndex = random(0, songKeys['9'].length -1)
  var randomMetronomeSong = songKeys['9'][randomMetronomeIndex]

  var randomElPesebreIndex = random(0, songKeys['7'].length -1)
  var randomElPesebreSong = songKeys['7'][randomElPesebreIndex]

  console.log(randomMetronomeSong)
  console.log(randomElPesebreSong)

  var trialAccelerometer2 = {
      type: jsPsychAudioKeyboardResponse,
      stimulus: './songs/movementTapAudio/modifiedAudio/' + randomMetronomeSong,
      prompt: "<img id='pocket' src='./images/pocket.svg'></img>",
      trial_duration: 63000,
      //trial_duration: 1000, //simuBack
      choices: ["NO_KEYS"],
      extensions: [
        {type: jsPsychExtensionAccelerometer }
      ],
      on_load: function(){
        document.getElementById("pocket").style.marginTop = 0
      }
  }

  var songsToPreload = [randomElPesebreSong, randomMetronomeSong]
  var songPaths = './songs/movementTapAudio/modifiedAudio/'
  var pathsToPreload = songsToPreload.map(i=>songPaths+i)

  var preloadSongs1 = {
    type: jsPsychPreload,
    audio: pathsToPreload,
    auto_preload: false,
  }   

  var preloadChosen = {
    type: jsPsychPreload,
    audio: '',
    on_start: function(trial) {
      trial.audio = './songs/movementTapAudio/modifiedAudio/' + window.randomChosenSong
    },
    auto_preload: false,
  }   

  var trialAccelerometer3 = {
      type: jsPsychAudioKeyboardResponse,
      stimulus: './songs/movementTapAudio/modifiedAudio/' + randomElPesebreSong,
      prompt: "<img id='pocket' src='./images/pocket.svg'></img>",
      trial_duration: 63000,
      //trial_duration: 1000, //simuBack
      choices: ["NO_KEYS"],
      extensions: [
        {type: jsPsychExtensionAccelerometer }
      ],
  }

  var trialAccelerometer4 = {
      type: jsPsychAudioKeyboardResponse,
      stimulus: '',
      prompt: "<img id='pocket' src='./images/pocket.svg'></img>",
      trial_duration: 63000,
      //trial_duration: 1000, //simuBack
      choices: ["NO_KEYS"],
      extensions: [
        {type: jsPsychExtensionAccelerometer }
      ],
      on_start: function(trial) {
          var allData = jsPsych.data.get().values()
          trial.stimulus = './songs/movementTapAudio/modifiedAudio/' + window.randomChosenSong
      },
      on_load: function(){
        document.getElementById("pocket").style.marginTop = 0
      }

  }

  var phoneInPocket1 = {
    type: jsPsychSurveyText,
    questions: [
      {prompt: movement["wherePhone"][lang], columns: 30}
    ],
    button_label: recurring['continue'][lang],
    on_finish: function(data){
      var last2 = jsPsych.data.get().last(4);
      var songBeingRated = last2['trials'][0].stimulus
      data.song = songBeingRated
      console.log(songBeingRated)
      data.stimulus = "whereKeptPhone"
    }
  }

  var phoneInPocket2 = {
    type: jsPsychSurveyText,
    questions: [
      {prompt: movement["wherePhone"][lang], columns: 30},
    ],
    button_label: recurring['continue'][lang],
    on_finish: function(data){
      var last2 = jsPsych.data.get().last(6);
      var songBeingRated = last2['trials'][0].stimulus
      data.song = songBeingRated
      console.log(songBeingRated)
      data.stimulus = "whereKeptPhone"
    }
  }

  var phoneInPocket3 = {
    type: jsPsychSurveyText,
    questions: [
      {prompt: movement["wherePhone"][lang], columns: 30},
    ],
    button_label: recurring['continue'][lang],
    on_finish: function(data){
      var last2 = jsPsych.data.get().last(8);
      var songBeingRated = last2['trials'][0].stimulus
      data.song = songBeingRated
      console.log(songBeingRated)
      data.stimulus = "whereKeptPhone"
    }
  }

  var weightHeight = {
    type: jsPsychSurveyText,
    questions: [
      {prompt: movement["reasonWeight"][lang]+ ":", placeholder: movement["height"][lang], columns: 30},
      {prompt: "", placeholder: movement["weight"][lang], columns: 30}
    ],
    button_label: recurring['continue'][lang],
  }

  //Original
  //var movementTimeline = [[preloadSongs1, instruction0, promptAccel, loadAccel, phonePocket, countDown, trialAccelerometer1, pickUpPhone, howDifficultMovement, instruction1, phonePocket, countDown, trialAccelerometer2, pickUpPhone, howDifficultMovement, likingBeatRating, grooveRatingBeat, instruction2, phonePocket, countDown, trialAccelerometer3, pickUpPhone, howDifficultMovement, familiarityRating, likingRating, grooveRating, instruction3, chooseSongs, preloadChosen, phonePocket, countDown, trialAccelerometer4, pickUpPhone, howDifficultMovement, familiarityRating, likingRating, grooveRating]];

  //Step by step
  if(version == "short"){
    console.log("Running short version")
    var firstMovement = [instruction0a, promptAccel, loadAccel, instruction0b, trial_in_fullscreen, phonePocket, countDown, trialAccelerometer1, pickUpPhone] //4
    var secondMovement = [preloadSongs1, instruction1, trial_in_fullscreen, phonePocket, countDown, trialAccelerometer2, pickUpPhone] //6
    var thirdMovement = [preloadSongs1, instruction2, trial_in_fullscreen, phonePocket, countDown, trialAccelerometer3, pickUpPhone] //8
    var fourthMovement = [instruction3, chooseSongs, preloadChosen, trial_in_fullscreen, phonePocket, countDown, trialAccelerometer4, pickUpPhone, weightHeight] //9
  } else {
    console.log("Running full version")
    var firstMovement = [instruction0a, promptAccel, loadAccel, instruction0b, trial_in_fullscreen, phonePocket, countDown, trialAccelerometer1, pickUpPhone, howDifficultMovement, phoneInPocket1] //4
    var secondMovement = [preloadSongs1, instruction1, trial_in_fullscreen, phonePocket, countDown, trialAccelerometer2, pickUpPhone, howDifficultMovement, likingBeatRating, grooveRatingBeat, phoneInPocket2] //6
    var thirdMovement = [preloadSongs1, instruction2, trial_in_fullscreen, phonePocket, countDown, trialAccelerometer3, pickUpPhone, howDifficultMovement, familiarityRating, likingRating, grooveRating, knowThisSong, phoneInPocket3] //8
    var fourthMovement = [instruction3, chooseSongs, preloadChosen, trial_in_fullscreen, phonePocket, countDown, trialAccelerometer4, pickUpPhone, howDifficultMovement, familiarityRating, likingRating, grooveRating, knowThisSong, phoneInPocket3, weightHeight] //9
  }


  var movementTimeline = [firstMovement, secondMovement, thirdMovement, fourthMovement];

  return(movementTimeline)
}

