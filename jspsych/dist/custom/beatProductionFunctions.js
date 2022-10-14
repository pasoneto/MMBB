//Generates random int between range
const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

//Beat alignment code
function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}

//Loads song with given volume
function playSound(buffer, context, volume){

  window.gainNode = context.createGain();

  const source = context.createBufferSource();
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
  var buffer = await fetch(url)
    .then(res => res.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer));
  var [gainNode, source] = playSound(buffer, context, volume);
  console.log(buffer) 
  console.log(url)
  window.nLoaded = window.nLoaded + 1;
  return [gainNode, source]
}

//Initiates all songs at the same time, and beat with a given offset
async function initiateContext(offset, beatsURL, songBaseURL){
  window.nLoaded = 0;
  let context = null;
  if (context) context.close();
  window.context = new AudioContext();

  [window.gainNodeBase, window.sourceBase] = await startLoop(songBaseURL, window.context, 0.5);

  if(offset == 1){
    [window.gainNode1, window.source1] = await startLoop(beatsURL + '/metronome_0.wav', window.context, 1);
    [window.gainNode2, window.source2] = await startLoop(beatsURL + '/metronome_1.wav', window.context, 0);
    [window.gainNode3, window.source3] = await startLoop(beatsURL + '/metronome_2.wav', window.context, 0);
    [window.gainNode4, window.source4] = await startLoop(beatsURL + '/metronome_3.wav', window.context, 0);
    [window.gainNode5, window.source5] = await startLoop(beatsURL + '/metronome_4.wav', window.context, 0);
    [window.gainNode6, window.source6] = await startLoop(beatsURL + '/metronome_5.wav', window.context, 0);
    [window.gainNode7, window.source7] = await startLoop(beatsURL + '/metronome_6.wav', window.context, 0); 
    [window.gainNode8, window.source8] = await startLoop(beatsURL + '/metronome_7.wav', window.context, 0);
  } else

  if(offset == 2){
    [window.gainNode1, window.source1] = await startLoop(beatsURL + '/metronome_0.wav', window.context, 0);
    [window.gainNode2, window.source2] = await startLoop(beatsURL + '/metronome_1.wav', window.context, 1);
    [window.gainNode3, window.source3] = await startLoop(beatsURL + '/metronome_2.wav', window.context, 0);
    [window.gainNode4, window.source4] = await startLoop(beatsURL + '/metronome_3.wav', window.context, 0);
    [window.gainNode5, window.source5] = await startLoop(beatsURL + '/metronome_4.wav', window.context, 0);
    [window.gainNode6, window.source6] = await startLoop(beatsURL + '/metronome_5.wav', window.context, 0);
    [window.gainNode7, window.source7] = await startLoop(beatsURL + '/metronome_6.wav', window.context, 0);
    [window.gainNode8, window.source8] = await startLoop(beatsURL + '/metronome_7.wav', window.context, 0);
  } else

  if(offset == 3){
    [window.gainNode1, window.source1] = await startLoop(beatsURL + '/metronome_0.wav', window.context, 0);
    [window.gainNode2, window.source2] = await startLoop(beatsURL + '/metronome_1.wav', window.context, 0);
    [window.gainNode3, window.source3] = await startLoop(beatsURL + '/metronome_2.wav', window.context, 1);
    [window.gainNode4, window.source4] = await startLoop(beatsURL + '/metronome_3.wav', window.context, 0);
    [window.gainNode5, window.source5] = await startLoop(beatsURL + '/metronome_4.wav', window.context, 0);
    [window.gainNode6, window.source6] = await startLoop(beatsURL + '/metronome_5.wav', window.context, 0);
    [window.gainNode7, window.source7] = await startLoop(beatsURL + '/metronome_6.wav', window.context, 0);
    [window.gainNode8, window.source8] = await startLoop(beatsURL + '/metronome_7.wav', window.context, 0);
  } else

  if(offset == 4){
    [window.gainNode1, window.source1] = await startLoop(beatsURL + '/metronome_0.wav', window.context, 0);
    [window.gainNode2, window.source2] = await startLoop(beatsURL + '/metronome_1.wav', window.context, 0);
    [window.gainNode3, window.source3] = await startLoop(beatsURL + '/metronome_2.wav', window.context, 0);
    [window.gainNode4, window.source4] = await startLoop(beatsURL + '/metronome_3.wav', window.context, 1);
    [window.gainNode5, window.source5] = await startLoop(beatsURL + '/metronome_4.wav', window.context, 0);
    [window.gainNode6, window.source6] = await startLoop(beatsURL + '/metronome_5.wav', window.context, 0);
    [window.gainNode7, window.source7] = await startLoop(beatsURL + '/metronome_6.wav', window.context, 0);
    [window.gainNode8, window.source8] = await startLoop(beatsURL + '/metronome_7.wav', window.context, 0);
  } else

  if(offset == 5){
    [window.gainNode1, window.source1] = await startLoop(beatsURL + '/metronome_0.wav', window.context, 0);
    [window.gainNode2, window.source2] = await startLoop(beatsURL + '/metronome_1.wav', window.context, 0);
    [window.gainNode3, window.source3] = await startLoop(beatsURL + '/metronome_2.wav', window.context, 0);
    [window.gainNode4, window.source4] = await startLoop(beatsURL + '/metronome_3.wav', window.context, 0);
    [window.gainNode5, window.source5] = await startLoop(beatsURL + '/metronome_4.wav', window.context, 1);
    [window.gainNode6, window.source6] = await startLoop(beatsURL + '/metronome_5.wav', window.context, 0);
    [window.gainNode7, window.source7] = await startLoop(beatsURL + '/metronome_6.wav', window.context, 0);
    [window.gainNode8, window.source8] = await startLoop(beatsURL + '/metronome_7.wav', window.context, 0);
  } else

  if(offset == 6){
    [window.gainNode1, window.source1] = await startLoop(beatsURL + '/metronome_0.wav', window.context, 0);
    [window.gainNode2, window.source2] = await startLoop(beatsURL + '/metronome_1.wav', window.context, 0);
    [window.gainNode3, window.source3] = await startLoop(beatsURL + '/metronome_2.wav', window.context, 0);
    [window.gainNode4, window.source4] = await startLoop(beatsURL + '/metronome_3.wav', window.context, 0);
    [window.gainNode5, window.source5] = await startLoop(beatsURL + '/metronome_4.wav', window.context, 0);
    [window.gainNode6, window.source6] = await startLoop(beatsURL + '/metronome_5.wav', window.context, 1);
    [window.gainNode7, window.source7] = await startLoop(beatsURL + '/metronome_6.wav', window.context, 0);
    [window.gainNode8, window.source8] = await startLoop(beatsURL + '/metronome_7.wav', window.context, 0);
  } else

  if(offset == 7){
    [window.gainNode1, window.source1] = await startLoop(beatsURL + '/metronome_0.wav', window.context, 0);
    [window.gainNode2, window.source2] = await startLoop(beatsURL + '/metronome_1.wav', window.context, 0);
    [window.gainNode3, window.source3] = await startLoop(beatsURL + '/metronome_2.wav', window.context, 0);
    [window.gainNode4, window.source4] = await startLoop(beatsURL + '/metronome_3.wav', window.context, 0);
    [window.gainNode5, window.source5] = await startLoop(beatsURL + '/metronome_4.wav', window.context, 0);
    [window.gainNode6, window.source6] = await startLoop(beatsURL + '/metronome_5.wav', window.context, 0);
    [window.gainNode7, window.source7] = await startLoop(beatsURL + '/metronome_6.wav', window.context, 1);
    [window.gainNode8, window.source8] = await startLoop(beatsURL + '/metronome_7.wav', window.context, 0);
  } else

  if(offset == 8){
    [window.gainNode1, window.source1] = await startLoop(beatsURL + '/metronome_0.wav', window.context, 0);
    [window.gainNode2, window.source2] = await startLoop(beatsURL + '/metronome_1.wav', window.context, 0);
    [window.gainNode3, window.source3] = await startLoop(beatsURL + '/metronome_2.wav', window.context, 0);
    [window.gainNode4, window.source4] = await startLoop(beatsURL + '/metronome_3.wav', window.context, 0);
    [window.gainNode5, window.source5] = await startLoop(beatsURL + '/metronome_4.wav', window.context, 0);
    [window.gainNode6, window.source6] = await startLoop(beatsURL + '/metronome_5.wav', window.context, 0);
    [window.gainNode7, window.source7] = await startLoop(beatsURL + '/metronome_6.wav', window.context, 0);
    [window.gainNode8, window.source8] = await startLoop(beatsURL + '/metronome_7.wav', window.context, 1);
  }

  var promise = Promise.resolve("All loaded");

  return(promise)
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
    stimulus: recurring["6"][lang],
    choices: buttons["1"][lang],
    prompt: "",
    on_load: async function(){

      document.querySelector(".jspsych-btn").style.display = "none";
      //Initial offset  
      window.count = randomInt(1, 8);
      
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
          
      var allLoaded = await initiateContext(window.count, beatsURL, songBaseURL)

      document.querySelector(".jspsych-btn").style.display = "block";
      document.querySelector("#jspsych-html-button-response-stimulus").innerHTML = "";

    },
  };
  return(loadNextTrial)
}
