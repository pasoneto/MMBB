const FRAME_SIZE = 128;
var latencyMeasured;

class Player extends AudioWorkletProcessor {
  constructor() {
    super();
    
    // State related to peak detection processing:
    // clicks
    this.click_index = 0;
    const bpm = 60;
    this.click_frame_interval = Math.round(sampleRate / FRAME_SIZE * 60 / bpm);
    this.click_index_samples = 0;
    this.click_length_samples = sampleRate / 64;

    // peak detection
    this.window = [];
    this.last_peak = Date.now();
    this.background_noise = 0;
    this.background_samples = [];
    this.max_background_samples = sampleRate * 3 / FRAME_SIZE;  // 3s
    this.frames_since_last_beat = 0;

    // tuning params
    this.peak_ratio = 10;
    this.min_peak_interval_ms = 200;
    this.window_size_samples = 20;
    this.click_interval_samples = 3000;

    this.latencies = [];
  }
  
  process (inputs, outputs, parameters) {
    this.click_index++;
    var is_beat = this.click_index % this.click_frame_interval == 0;
    if (is_beat) {
      this.frames_since_last_beat = 0;
      this.click_index_samples = 0;
    } else {
      this.frames_since_last_beat++;
    }

    const freq = 1024;
    const period = sampleRate / freq;

    for (var k = 0; k < outputs[0][0].length; k++) {
      if (this.click_index_samples < this.click_length_samples) {
        outputs[0][0][k] = Math.sin(
          Math.PI * 2 * this.click_index_samples / period);
        this.click_index_samples++;
      } else {
        outputs[0][0][k] = 0;
      }
      for (var j = 1; j < outputs[0].length; j++) {
        outputs[0][j][k] = outputs[0][0][k];
      }
    }

    var noise = 0;
    for (var i = 0 ; i < inputs[0][0].length; i++) {
      var sample = inputs[0][0][i];
      noise += Math.abs(sample);

      this.window.push(sample);
      if (this.window.length > this.window_size_samples) {
        this.window.shift();
      }

      if (this.background_noise > 0) {
        this.detect_peak(i);
      }
    }

    this.background_samples.push(noise);
    this.background_noise += noise;
    if (this.background_samples.length > this.max_background_samples) {
      // Note: if this ends up using too much CPU we can use a circular buffer.
      this.background_noise -= Math.abs(this.background_samples.shift());
    }
    return true;
  }

  detect_peak(index) {
    var now = Date.now();
    var abs_sum = 0;
    for (var i = 0; i < this.window.length; i++) {
      abs_sum += Math.abs(this.window[i]);
    }

    if (abs_sum / this.window.length >
        this.background_noise / (
          this.background_samples.length * FRAME_SIZE) * this.peak_ratio &&
        now - this.last_peak > this.min_peak_interval_ms) {
      this.last_peak = now;
      var latency_samples = index + FRAME_SIZE*this.frames_since_last_beat;
      var latency_ms = 1000.0 * latency_samples / sampleRate;
      if (latency_ms > 500) {
        latency_ms -= 1000;
      }
      console.log(latency_ms);
    }
  }
}

registerProcessor('player', Player)
