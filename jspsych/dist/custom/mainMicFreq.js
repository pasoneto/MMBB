var audioContext = null;
var mediaStreamSource = null;

async function startMeter() {	
    audioContext = new AudioContext();
    var stream = await navigator.mediaDevices.getUserMedia( { "audio": { "mandatory": { "googEchoCancellation": "false", "googAutoGainControl": "false", "googNoiseSuppression": "false", "googHighpassFilter": "false" }, "optional": [] }, })
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
}


