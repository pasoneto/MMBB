const audioCtx = new AudioContext();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = 'sine';
oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);

async function startStop(nLoops){
  oscillator.start();
  for (let i = 0; i < nLoops; i++) {
    await sleep(300)  
    oscillator.disconnect(audioCtx.destination);
    await sleep(300)  
    oscillator.connect(audioCtx.destination);
  }
  oscillator.stop()
}

function getLocalStream() {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then((stream) => {
        window.localStream = stream;
        window.localAudio.srcObject = stream;
        window.localAudio.autoplay = true;
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start(); 

        mediaRecorder.addEventListener("dataavailable", event => {
          console.log(event.data);
        });

    }).catch((err) => {
        console.error(`you got an error: ${err}`)
    });
}

getLocalStream();
