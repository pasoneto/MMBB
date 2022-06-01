//Define countdown node
var first = {
  type: jsPsychHtmlButtonResponse,
  prompt: '<p style="font-size:6vw;">3</p>',
  choices: [],
  stimulus: '<p style="font-size:6vw;">Beginning in </p>',
  trial_duration: 1000
};
var second = {
  type: jsPsychHtmlButtonResponse,
  prompt: '<p style="font-size:6vw;">2</p>',
  choices: [],
  stimulus: '<p style="font-size:6vw;">Beginning in </p>',
  trial_duration: 1000
};
var third = {
  type: jsPsychHtmlButtonResponse,
  prompt: '<p style="font-size:6vw;">1</p>',
  choices: [],
  stimulus: '<p style="font-size:6vw;">Beginning in </p>',
  trial_duration: 1000
};

var countdown = {
  timeline: [first, second, third],
}




