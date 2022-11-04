//sum of the absolute squares of its time-domain samples divided by the signal length,
//or, equivalently, the square of its RMS level.

function amplitude(signal){
  let Squares = signal.map((val) => (val*val));
  let Sum = Squares.reduce((acum, val) => (acum + val));
  Mean = Sum/signal.length;
  rms = Math.sqrt(Mean);
  return(rms)
}

function successCallback(stream) {
  try{
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    var audioContext = new AudioContext()

    var analyser = audioContext.createAnalyser()
    analyser.fftSize = Math.pow(2, 13) //Window size
    //Window size = 8192samples, sr = 44100
    //Window size (s) = 185ms
  
    var sampleRate = audioContext.sampleRate
    var data = new Float32Array(analyser.fftSize)
    document.getElementById("frequency").innerHTML = frequency;
    function step() {
        requestAnimationFrame(step)
        analyser.getFloatTimeDomainData(data)
        var frequency = window.yin(data, sampleRate)
        var amp = amplitude(data)
        document.getElementById("frequency").innerHTML = frequency;
        document.getElementById("amplitude").innerHTML = amp;
    }

    var mediaStreamSource = audioContext.createMediaStreamSource(stream)
    mediaStreamSource.connect(analyser)

    requestAnimationFrame(step)
  } catch(e){
    alert(e)
  }
}

function errorCallback(err) {
    alert(err)
}

//navigator.getUserMedia({audio: true}, successCallback, errorCallback)
navigator.mediaDevices.getUserMedia( { "audio": { "mandatory": { "googEchoCancellation": "false", "googAutoGainControl":  "false", "googNoiseSuppression": "false", "googHighpassFilter":   "false"}, "optional": []}, })
  .then((stream)=> {
    successCallback(stream)
  })

