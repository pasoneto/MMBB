var audioChunks = [];

var recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.addEventListener("dataavailable", event => {
      console.log(event)
      window.audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start(1);

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });
        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

async function startRecord(time){
  const recorder = await recordAudio();
  recorder.start();
  await sleep(time);
  const audio = await recorder.stop();
} 

async function getAudioSignal(){
  var bufferBinary = await window.audioChunks[0].arrayBuffer()
  var audioBuffer = await audioCtx.decodeAudioData(bufferBinary)
  var audioBuffer = await audioBuffer.getChannelData(0)
  var indexes = await Object.keys(audioBuffer)
  var audioBuffer = await indexes.map(i=>audioBuffer[i])
  return audioBuffer
}

startRecord(3000)
//getAudioSignal()

