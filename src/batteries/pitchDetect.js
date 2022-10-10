class PitchDetect extends AudioWorkletProcessor {
  constructor() {
    super();
  }
  process (inputs, outputs, parameters) {
    console.log(inputs);
    console.log(outputs);
  }
}

registerProcessor('pitchDetect', PitchDetect)
