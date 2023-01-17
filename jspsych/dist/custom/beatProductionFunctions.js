//Generates random int between range
const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

//Beat alignment code
function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}

//Loads song with given volume
async function playSound(buffer, context, volume){

  window.gainNode = context.createGain();
  var source = null
  var source = context.createBufferSource();
  source.buffer = buffer
  source.loop = false;
  source.connect(window.gainNode);
  window.gainNode.connect(context.destination);
  window.gainNode.gain.value = volume
  //source.start(5);
  return [gainNode, source]
}

var nLoaded = 0
//Starts song with given volume
async function startLoop(url, context, volume){
  var buffer = await jsPsych.pluginAPI.getAudioBuffer(url);
  var [gainNode, source] = await playSound(buffer, context, volume);
  console.log(buffer) 
  console.log(url)
  window.nLoaded = window.nLoaded + 1;
  return [gainNode, source]
}

//Initiates all songs at the same time, and beat with a given offset
async function initiateContext(offset, beatsURL, songBaseURL){
  window.nLoaded = 0;
  if(window.context){
    window.context.close()
  };
  //window.context = new AudioContext();
  window.context = this.jsPsych.pluginAPI.audioContext();
  //Defining which beat will start
  var volumes = [0, 0, 0, 0, 0, 0, 0, 0]
  volumes[offset] = 1
  console.log(volumes) 
  var values = startLoop(songBaseURL, window.context, 0.5);
  var values1 = startLoop(beatsURL + '/downmetronome_0.mp3', window.context, volumes[0]);
  var values2 = startLoop(beatsURL + '/downmetronome_1.mp3', window.context, volumes[1]);
  var values3 = startLoop(beatsURL + '/downmetronome_2.mp3', window.context, volumes[2]);
  var values4 = startLoop(beatsURL + '/downmetronome_3.mp3', window.context, volumes[3]);
  var values5 = startLoop(beatsURL + '/downmetronome_4.mp3', window.context, volumes[4]);
  var values6 = startLoop(beatsURL + '/downmetronome_5.mp3', window.context, volumes[5]);
  var values7 = startLoop(beatsURL + '/downmetronome_6.mp3', window.context, volumes[6]); 
  var values8 = startLoop(beatsURL + '/downmetronome_7.mp3', window.context, volumes[7]);

  var values = await values
  var values1 = await values1
  var values2 = await values2
  var values3 = await values3
  var values4 = await values4
  var values5 = await values5
  var values6 = await values6
  var values7 = await values7
  var values8 = await values8

  window.gainNodeBase = values[0]
  window.sourceBase   = values[1]
  window.gainNode1 = values1[0]
  window.source1   = values1[1]
  window.gainNode2 = values2[0]
  window.source2   = values2[1]
  window.gainNode3 = values3[0]
  window.source3   = values3[1]
  window.gainNode4 = values4[0]
  window.source4   = values4[1]
  window.gainNode5 = values5[0]
  window.source5   = values5[1]
  window.gainNode6 = values6[0]
  window.source6   = values6[1]
  window.gainNode7 = values7[0]
  window.source7   = values7[1]
  window.gainNode8 = values8[0]
  window.source8  = values8[1]

}

//Shift arrays like escada rolante
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

function shift(plus = false){
  if(plus == true){
    window.count = (window.count+1).mod(8)
  } else {
    window.count = (window.count-1).mod(8)
  }
}

//Changes volume of given track
function fluidBeat(plus, offset){

  shift(plus) 
  var offset = window.count
 
  if(offset == 0){
    window.gainNode1.gain.value = 1
    window.gainNode2.gain.value = 0
    window.gainNode3.gain.value = 0
    window.gainNode4.gain.value = 0
    window.gainNode5.gain.value = 0
    window.gainNode6.gain.value = 0
    window.gainNode7.gain.value = 0
    window.gainNode8.gain.value = 0
  } else if(offset == 1){
    window.gainNode1.gain.value = 0
    window.gainNode2.gain.value = 1
    window.gainNode3.gain.value = 0
    window.gainNode4.gain.value = 0
    window.gainNode5.gain.value = 0
    window.gainNode6.gain.value = 0
    window.gainNode7.gain.value = 0
    window.gainNode8.gain.value = 0
  } else if(offset == 2){
    window.gainNode1.gain.value = 0
    window.gainNode2.gain.value = 0
    window.gainNode3.gain.value = 1
    window.gainNode4.gain.value = 0
    window.gainNode5.gain.value = 0
    window.gainNode6.gain.value = 0
    window.gainNode7.gain.value = 0
    window.gainNode8.gain.value = 0
  } else if(offset == 3){
    window.gainNode1.gain.value = 0
    window.gainNode2.gain.value = 0
    window.gainNode3.gain.value = 0
    window.gainNode4.gain.value = 1
    window.gainNode5.gain.value = 0
    window.gainNode6.gain.value = 0
    window.gainNode7.gain.value = 0
    window.gainNode8.gain.value = 0
  } else if(offset == 4){
    window.gainNode1.gain.value = 0
    window.gainNode2.gain.value = 0
    window.gainNode3.gain.value = 0
    window.gainNode4.gain.value = 0
    window.gainNode5.gain.value = 1
    window.gainNode6.gain.value = 0
    window.gainNode7.gain.value = 0
    window.gainNode8.gain.value = 0
  } else if(offset == 5){
    window.gainNode1.gain.value = 0
    window.gainNode2.gain.value = 0
    window.gainNode3.gain.value = 0
    window.gainNode4.gain.value = 0
    window.gainNode5.gain.value = 0
    window.gainNode6.gain.value = 1
    window.gainNode7.gain.value = 0
    window.gainNode8.gain.value = 0
  } else if(offset == 6){
    window.gainNode1.gain.value = 0
    window.gainNode2.gain.value = 0
    window.gainNode3.gain.value = 0
    window.gainNode4.gain.value = 0
    window.gainNode5.gain.value = 0
    window.gainNode6.gain.value = 0
    window.gainNode7.gain.value = 1
    window.gainNode8.gain.value = 0
  } else if(offset == 7){
    window.gainNode1.gain.value = 0
    window.gainNode2.gain.value = 0
    window.gainNode3.gain.value = 0
    window.gainNode4.gain.value = 0
    window.gainNode5.gain.value = 0
    window.gainNode6.gain.value = 0
    window.gainNode7.gain.value = 0
    window.gainNode8.gain.value = 1
  } 

  window.gainNodeBase.gain.value = 0.5

}

//Generates object of trial
function generateContextTrial(songBaseURL, beatsURL, lang){
  var loadNextTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<img id="logoLoading" src="../../images/loading2.gif"><br>Loading...',
    choices: [buttons[0][lang]],
    prompt: "",
    on_load: async function(){

      document.querySelector(".jspsych-btn").style.display = "none";

      //Initial offset  
      var possibleOffsets = [1, 2, 3, 5, 6, 7];
      window.count = possibleOffsets[Math.floor(Math.random()*possibleOffsets.length)];

      window.initialOffset = window.count; //Initial offset

      console.log(window.count) 
      //Initiate source audios as global variables
      window.source1 = null
      window.source2 = null
      window.source3 = null
      window.source4 = null
      window.source5 = null
      window.source6 = null
      window.source7 = null
      window.source8 = null
      window.sourceBase = null

      window.gainNode1 = null
      window.gainNode2 = null
      window.gainNode3 = null
      window.gainNode4 = null
      window.gainNode5 = null
      window.gainNode6 = null
      window.gainNode7 = null
      window.gainNode8 = null
      window.gainNodeBase = null
          
      window.context = null;
          
      await initiateContext(window.count, beatsURL, songBaseURL)

      document.querySelector(".jspsych-btn").style.display = "block";
      document.querySelector("#jspsych-html-button-response-stimulus").innerHTML = "";
      document.querySelector(".jspsych-btn").click()

    },
    on_finish: function(data){
      data.batSong = songBaseURL;
      //document.querySelector(".jspsych-btn").removeEventListener("click", startSounds)
    }
  };
  return(loadNextTrial)
}
