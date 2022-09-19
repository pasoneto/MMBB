var audioChunks = [];

var recordAudio2 = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
mediaRecorder.addEventListener("dataavailable", event => {
      window.audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          console.log(audioChunks)
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

(async () => {
  const recorder = await recordAudio2();
  recorder.start();
  await sleep(3000);
  const audio = await recorder.stop();
  audio.play();
})(); 

(async () => {
  var bufferBinary = await window.audioChunks[0].arrayBuffer()
  var audioBuffer = await audioCtx.decodeAudioData(bufferBinary)
  console.log(audioBuffer)
})();


