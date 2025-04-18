var jsPsychHtmlMultiSliderResponse = (function (jspsych) {
  'use strict';

  const info = {
      name: "html-multi-slider-response",
      parameters: {
          /** The HTML string to be displayed */
          stimulus: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Stimulus",
              default: undefined,
          },
          /** Sets the minimum value of the slider. */
          min: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Min slider",
              default: 1,
          },
          /** Sets the maximum value of the slider */
          max: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Max slider",
              default: 9,
          },
          
          /** Sets the starting value of the slider */
          slider_start: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Slider starting value",
              default: 5,
          },
          nSliders: {
            type: jspsych.ParameterType.INT,
            pretty_name: "Slider number",
            default: 1,
          },
          /** Sets the step of the slider */
          step: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Step",
              default: 1,
          },
          /** Array containing the labels for the slider. Labels will be displayed at equidistant locations along the slider. */
          labels: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Labels",
              default: [],
              array: true,
          },
          /** Array containing the labels for the slider. Labels will be displayed at equidistant locations along the slider. */
          emojis: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Emojis",
              default: null,
              array: true,
          },
          /** Width of the slider in pixels. */
          slider_width: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Slider width",
              default: null,
          },
          /** Label of the button to advance. */
          button_label: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Button label",
              default: "Continue",
              array: false,
          },
          /** If true, the participant will have to move the slider before continuing. */
          require_movement: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Require movement",
              default: false,
          },
          /** Any content here will be displayed below the slider. */
          prompt: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Prompt",
              default: null,
          },
          /** How long to show the stimulus. */
          stimulus_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Stimulus duration",
              default: null,
          },
          /** How long to show the trial. */
          trial_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Trial duration",
              default: null,
          },
          /** If true, trial will end when user makes a response. */
          response_ends_trial: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Response ends trial",
              default: true,
          },
      },
  };
  /**
   * **html-multi-slider-response**
   *
   * jsPsych plugin for showing an HTML stimulus and collecting multiple slider responses
   *
   * @author Josh de Leeuw
   * @see {@link https://www.jspsych.org/plugins/jspsych-html-slider-response/ html-slider-response plugin documentation on jspsych.org}
   */
  class HtmlMultiSliderResponsePlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
          // half of the thumb width value from jspsych.css, used to adjust the label positions
          var half_thumb_width = 7.5;
          var html = '<div id="jspsych-html-slider-response-wrapper-emotion">';
          if (trial.prompt !== null) {
            html += '<div id="emotionPromptDiv">' + trial.prompt + '</div>';
          }
          for (var k = 0; k < trial.nSliders; k++) {
            html += '<div id="emotionSliderWrap">'
            html += '<div id="jspsych-html-slider-response-stimulus">' + trial.stimulus[k] + "</div>";
            html += '<div id="wrapColumnEmojis">'
            if(trial.emojis){ //Adding emoji to the left of slider
              html += trial.emojis[k][0]
            }
            html += '<div class="jspsych-html-slider-response-container">';
            html +=
                '<input type="range" class="jspsych-slider" value="' +
                    trial.slider_start +
                    '" min="' +
                    trial.min +
                    '" max="' +
                    trial.max +
                    '" step="' +
                    trial.step +
                    '" id="jspsych-html-slider-response-response-' + k.toString() + '"></input>';
            html += "<div id='multiSliderWrapper'>";
            for (var j = 0; j < trial.labels[k].length; j++) {
                var label_width_perc = 100 / (trial.labels[k].length - 1);
                var percent_of_range = j * (100 / (trial.labels[k].length - 1));
                var percent_dist_from_center = ((percent_of_range - 50) / 50) * 100;
                var offset = (percent_dist_from_center * half_thumb_width) / 100;
                html += '<div id="labelMultiSlider">' + trial.labels[k][j] + "</div>";
            }
            html += "</div>";
            html += "</div>";
            if(trial.emojis){ //Adding emoji to the left of slider
              html += trial.emojis[k][1]
            }
            html += "</div>";

            html += '</div>' //Closing emotionSliderWrap
          }
          html +=
              '<button id="jspsych-html-slider-response-next" class="jspsych-btn" ' +
                  (trial.require_movement ? "disabled" : "") +
                  ">" +
                  trial.button_label +
                  "</button>";
          html += "</div>";
          // add submit button
          display_element.innerHTML = html;
          var response = {
              rt: null,
              response: null,
          };
          if (trial.require_movement) {
              const enable_button = () => {
                  display_element.querySelector("#jspsych-html-slider-response-next").disabled = false;
              };
              for (var k = 0; k < trial.nSliders; k++) {
              display_element
                  .querySelector("#jspsych-html-slider-response-response-" + k.toString())
                  .addEventListener("mousedown", enable_button);
              display_element
                  .querySelector("#jspsych-html-slider-response-response-" + k.toString())
                  .addEventListener("touchstart", enable_button);
              display_element
                  .querySelector("#jspsych-html-slider-response-response-" + k.toString())
                  .addEventListener("change", enable_button);
              }
          }
          const end_trial = () => {
              this.jsPsych.pluginAPI.clearAllTimeouts();
              // save data
              var trialdata = {
                  rt: response.rt,
                  stimulus: trial.stimulus,
                  slider_start: trial.slider_start,
                  response: response.response,
              };
              display_element.innerHTML = "";
              // next trial
              this.jsPsych.finishTrial(trialdata);
          };
          display_element
              .querySelector("#jspsych-html-slider-response-next")
              .addEventListener("click", () => {
              // measure response time
              var endTime = performance.now();
              response.rt = Math.round(endTime - startTime);
              response.response = []
              for (var k = 0; k < trial.nSliders; k++) {
                response.response[k] = display_element.querySelector("#jspsych-html-slider-response-response-" + k.toString()).valueAsNumber;
              }
              if (trial.response_ends_trial) {
                  end_trial();
              }
              else {
                  display_element.querySelector("#jspsych-html-slider-response-next").disabled = true;
              }
          });
          if (trial.stimulus_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(() => {
                  display_element.querySelector("#jspsych-html-slider-response-stimulus").style.visibility = "hidden";
              }, trial.stimulus_duration);
          }
          // end trial if trial_duration is set
          if (trial.trial_duration !== null) {
              this.jsPsych.pluginAPI.setTimeout(end_trial, trial.trial_duration);
          }
          var startTime = performance.now();
      }
      simulate(trial, simulation_mode, simulation_options, load_callback) {
          if (simulation_mode == "data-only") {
              load_callback();
              this.simulate_data_only(trial, simulation_options);
          }
          if (simulation_mode == "visual") {
              this.simulate_visual(trial, simulation_options, load_callback);
          }
      }
      create_simulation_data(trial, simulation_options) {
          const default_data = {
              stimulus: trial.stimulus,
              slider_start: trial.slider_start,
              response: this.jsPsych.randomization.randomInt(trial.min, trial.max),
              rt: 2000,
          };
          const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
          this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
          return data;
      }
      simulate_data_only(trial, simulation_options) {
          const data = this.create_simulation_data(trial, simulation_options);
          this.jsPsych.finishTrial(data);
      }
      simulate_visual(trial, simulation_options, load_callback) {
          const data = this.create_simulation_data(trial, simulation_options);
          const display_element = this.jsPsych.getDisplayElement();
          this.trial(display_element, trial);
          load_callback();
          if (data.rt !== null) {
              const el = display_element.querySelector("input[type='range']");
              setTimeout(() => {
                  this.jsPsych.pluginAPI.clickTarget(el);
                  el.valueAsNumber = data.response;
              }, 2);
              this.jsPsych.pluginAPI.clickTarget(display_element.querySelector("button"), data.rt);
          }
      }
  }
  HtmlMultiSliderResponsePlugin.info = info;

  return HtmlMultiSliderResponsePlugin;

})(jsPsychModule);
