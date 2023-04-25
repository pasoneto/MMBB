var chooseLangTrial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "Choose a language <br> Valitse kieli",
  choices: ["English", "Finnish"],
  prompt: '',
  on_load: function(){
    document.getElementById("jspsych-html-button-response-btngroup").getElementsByClassName("jspsych-btn")[1].style.background = "purple"
  },
  on_finish: function(data){
    if(data.response == 0){
      window.lang = "eng"
    } else {
      window.lang = "fi"
    }
  }
};
