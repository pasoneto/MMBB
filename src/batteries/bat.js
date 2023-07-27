function generateBatTimeline(lang){
  var frontPage = {
      type: jsPsychInstructions,
      pages: [beatProduction["openPage"][lang]],
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true,
      on_start: function(){
        //disalowRefresh.addEventListener("onbeforeunload", preventRefresh, false);
        //window.removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
      }
  }
    
  var instruction2 = {
      type: jsPsychInstructions,
      pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i=> beatProduction["instruction" + i][lang]),
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true,
  }

  var instruction3 = {
      type: jsPsychInstructions,
      pages: [11, 12].map(i=> beatProduction["instruction" + i][lang]),
      button_label_next: buttons["next"][lang],
      button_label_previous: buttons["previous"][lang],
      show_clickable_nav: true,
  }

  //Load songs and beats for given trial 
  var songBaseURL0 = './songs/beatProductionAudio/beatModified/baseSongs/training/trainingBaseModified.mp3'
  var beatsURL0 = './songs/beatProductionAudio/beatModified/training'
  var loadTrial0 = generateContextTrial(songBaseURL0, beatsURL0, lang)

  //Load songs and beats for given trial 
  var songBaseURL1 = './songs/beatProductionAudio/beatModified/baseSongs/habstrack_clowns/habstrack_clownsModifiedLow.mp3'
  var beatsURL1 = './songs/beatProductionAudio/beatModified/habstrackBeats'
  var loadTrial1 = generateContextTrial(songBaseURL1, beatsURL1, lang)

  //Load songs and beats for given trial 
  var songBaseURL2 = './songs/beatProductionAudio/beatModified/baseSongs/honeySuckle/honeysuckleRoseModifiedLow.mp3'
  var beatsURL2 = './songs/beatProductionAudio/beatModified/honeysuckleBeats'
  var loadTrial2 = generateContextTrial(songBaseURL2, beatsURL2, lang)

  //Load songs and beats for given trial 
  var songBaseURL3 = './songs/beatProductionAudio/beatModified/baseSongs/lettuce/lettuceModifiedLow.mp3'
  var beatsURL3 = './songs/beatProductionAudio/beatModified/lettuceBeats'
  var loadTrial3 = generateContextTrial(songBaseURL3, beatsURL3, lang)

  //Load songs and beats for given trial 
  var songBaseURL4 = './songs/beatProductionAudio/beatModified/baseSongs/floorplanNoLie/floorplanNoLieModifiedLow.mp3'
  var beatsURL4 = './songs/beatProductionAudio/beatModified/floorplanBeats'
  var loadTrial4 = generateContextTrial(songBaseURL4, beatsURL4, lang)

  //Load songs and beats for given trial 
  var songBaseURL5 = './songs/beatProductionAudio/beatModified/baseSongs/softSand/softSandModifiedLow.mp3'
  var beatsURL5 = './songs/beatProductionAudio/beatModified/softSandBeats'
  var loadTrial5 = generateContextTrial(songBaseURL5, beatsURL5, lang)

  //Load songs and beats for given trial 
  var songBaseURL6 = './songs/beatProductionAudio/beatModified/baseSongs/eclecticElectric/eclecticElectricModifiedLow.mp3'
  var beatsURL6 = './songs/beatProductionAudio/beatModified/eclecticBeats'
  var loadTrial6 = generateContextTrial(songBaseURL6, beatsURL6, lang)

  //How satisfied with the final alignment found for beat.
  var howSatisfiedBeat = {
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: beatProduction["howSatisfied"][lang] + "<div id='labelsWrapperLikert'><div id='leftLabel'>" + recurring["notAtAll"][lang] + "</div><div id='rightLabel'>" + recurring["veryMuch"][lang] + "</div></div>",  
      labels: [1, 2, 3, 4, 5].map(i => "<div id='labelLikert'>" + i + "</div>"),
    }],
    button_label: recurring['continue'][lang],
    randomize_question_order: false,
    on_load: function(){
      document.querySelector(".jspsych-survey-likert-statement").style.fontSize = '1em'
    }
  };

  var trialBeat = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<div id="titleBAT">' + beatProduction["adjustBeat"][lang] + "</div>" +
              '<div class="circle">'+
                '<div id="firstRowCircle">' +
                '<button class= "circle deg-4" id="bat0"></button>' +
                '<button class= "circle deg-5" id="bat1"></button>' +
                '<button class= "circle deg-6" id="bat2"></button>' +
                '</div>' +
                '<div id="secondRowCircle">' +
                '<button class= "circle deg-7" id="bat3"></button>' +
                '<button class= "circle deg-0" id="bat4"></button>' +
                '</div>' +
                '<div id="thirdRowCircle">' +
                '<button class= "circle deg-1" id="bat5"></button>' +
                '<button class= "circle deg-2" id="bat6"></button>' +
                '<button class= "circle deg-3" id="bat7"></button>' +
                '</div>' +
              '</div>',
    choices: [buttons["continue"][lang]],
    trial_duration: 500000, //simu
    prompt: "",
    on_start: function(data){
      data.initialOffset = window.initialOffset;
    },
    on_load: function(data){

      document.querySelector('#bat0').onclick = () => fluidBeat(offset = window.initOffsets[0], 0)
      document.querySelector('#bat1').onclick = () => fluidBeat(offset = window.initOffsets[1], 1)
      document.querySelector('#bat2').onclick = () => fluidBeat(offset = window.initOffsets[2], 2)
      document.querySelector('#bat3').onclick = () => fluidBeat(offset = window.initOffsets[3], 3)
      document.querySelector('#bat4').onclick = () => fluidBeat(offset = window.initOffsets[4], 4)
      document.querySelector('#bat5').onclick = () => fluidBeat(offset = window.initOffsets[5], 5)
      document.querySelector('#bat6').onclick = () => fluidBeat(offset = window.initOffsets[6], 6)
      document.querySelector('#bat7').onclick = () => fluidBeat(offset = window.initOffsets[7], 7)
      
      document.getElementById("bat0").style.background = "blue"

      document.querySelector(".jspsych-btn").style.display = "none"
      document.getElementById("jspsych-html-button-response-stimulus").style.display = "none"
      document.querySelector(".jspsych-content-wrapper").style.justifyContent = "center"

      var startButton = document.createElement("button");
      startButton.textContent = buttons['start'][lang]
      startButton.setAttribute('id', 'startButton');
      document.getElementById("jspsych-content").appendChild(startButton);
      document.getElementById("startButton").addEventListener("click", startSounds)

      //document.getElementById("jspsych-html-button-response-btngroup").style.marginTop = "0"

      //Start beats
      function startSounds(){

        var allSources = [window.source1, window.source2, window.source3, window.source4, window.source5, window.source6, window.source7, window.source8, window.sourceBase]
        for(i in allSources) {
          console.log(allSources[i] == null)
          allSources[i].start(2)
        }
        document.querySelector(".jspsych-btn").style.display = "block"
        document.getElementById("jspsych-html-button-response-stimulus").style.display = "flex"
        document.getElementById("jspsych-html-button-response-stimulus").style.margin = "auto"
        document.getElementById("jspsych-html-button-response-stimulus").style.flexWrap = "wrap"
        document.getElementById("jspsych-html-button-response-stimulus").style.justifyContent = "center"
        document.getElementById("jspsych-html-button-response-stimulus").style.height = "80%"
        document.getElementById("jspsych-html-button-response-stimulus").style.alignContent = "flex-start"
        //document.getElementById("jspsych-content").style.height = "80vh"

        
        //Adjust style of circle
        //document.getElementById("jspsych-html-button-response-btngroup").style.marginTop = "auto"
        startButton.remove()

        //Disable button for a 5 seconds
        document.querySelector(".jspsych-btn").disabled = true;
        sleep(2000).then(r => {
          document.querySelector(".jspsych-btn").disabled = false;
        })

      }
    },
    on_finish: function(data){
      var currentSong = jsPsych.data.getLastTimelineData()['trials'][0]["batSong"]
      data.batSong = currentSong;
      data.offset = window.count; //Final offset
      data.nChanges = window.nChanges; //How many times user changed
      data.initialOffset = window.initialOffset; //Initial offset
      var allSources = [window.source1, window.source2, window.source3, window.source4, window.source5, window.source6, window.source7, window.source8, window.sourceBase] //Stopping all songs
      for(i in allSources) {
        //allSources[i].stop() simu
      }
    }
  };

  var howDifficult = {
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: recurring["howEasy"][lang] + "<div id='labelsWrapperLikert'><div id='leftLabel'>" + recurring["veryEasy"][lang] + "</div><div id='rightLabel'>" + recurring["veryHard"][lang] + "</div></div>",  
      labels: [1, 2, 3, 4, 5].map(i => "<div id='labelLikert'>" + i + "</div>"),
    }],
    button_label: recurring['continue'][lang],
    randomize_question_order: false,
    on_load: function(){
      document.querySelector(".jspsych-survey-likert-statement").style.fontSize = '1em'
    }

  };

  var frontPageInstructions = [frontPage, instruction2]
  var zero = [loadTrial0, trialBeat, howSatisfiedBeat, howDifficult]
  var one = [loadTrial1, trialBeat, howSatisfiedBeat, howDifficult]
  var two = [loadTrial2, trialBeat, howSatisfiedBeat, howDifficult]
  var three = [loadTrial3, trialBeat, howSatisfiedBeat, howDifficult]
  var four = [loadTrial4, trialBeat, howSatisfiedBeat, howDifficult]
  var five = [loadTrial5, trialBeat, howSatisfiedBeat, howDifficult]
  var six = [loadTrial6, trialBeat, howSatisfiedBeat, howDifficult]

  //Step by step
  //var batTimeline = [frontPageInstructions, zero, one, two, three, four, five, six] simu

  var batTimeline = [one]

  //Original
  //var batTimeline = [frontPage, instruction2, loadTrial0, trialBeat, instruction3, loadTrial1, trialBeat, betweenTrial, loadTrial2, trialBeat, betweenTrial, loadTrial3, trialBeat, betweenTrial, loadTrial4, trialBeat, betweenTrial, loadTrial5, trialBeat, betweenTrial, loadTrial6, trialBeat];
  return(batTimeline)
}
