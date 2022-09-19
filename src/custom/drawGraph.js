function drawGraph(c){
    var ctx = c;
    var lasttimelinedata = jsPsych.data.getLastTimelineData().trials[1].accelerometer_data;
    var x = []
    var y = []
    var z = []
    var t = []
    for(var p of lasttimelinedata){
          x.push(p.x)
          y.push(p.y)
          z.push(p.z)
          t.push(p.t)
    }
    var yAxis = [x, y, z];
    graphCustom(t, yAxis, ['x', 'y', 'z'], ctx, 'line')
}

var displayAccel = {
    type: jsPsychCanvasButtonResponse,
    canvas_size: [250, 500],
    stimulus: drawGraph,
    choices: ['Next'],
}
