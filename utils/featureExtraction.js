// Tapping and movement features for the participant feedback page
// (utils/feedback.js). Browser port of processing_pipeline/feature_extraction/
// python_port/{tap,movement}.py, bug-for-bug: the movement autocorrelation peak is
// read one lag early and Kuramoto uses the untrimmed taps, as in the pipeline, so
// the scores sit on the same scale as the reference curves (feedbackNorms.js).
// If the pipeline changes, change this file and regenerate the norms together.
//
// Verified against the Python port on real trials by
// processing_pipeline/feature_extraction/js_port/verify.js (exact to 1e-9).
// Plain functions, no dependencies: runs in a browser or in node.

// ─── MATLAB-compatible primitives (python_port/matlab_compat.py) ─────────────
function quantileHazen(x, q){            // MATLAB quantile: (i-0.5)/n plateau
  var s = Array.from(x).sort((a, b) => a - b), n = s.length
  if(n == 0){ return NaN }
  if(n == 1){ return s[0] }
  var pos = q * n - 0.5                  // p_i = (i+0.5)/n for 0-based i
  if(pos <= 0){ return s[0] }
  if(pos >= n - 1){ return s[n - 1] }
  var i = Math.floor(pos)
  return s[i] + (pos - i) * (s[i + 1] - s[i])
}

function median(x){
  var s = Array.from(x).sort((a, b) => a - b), n = s.length
  if(n == 0){ return NaN }
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2
}

function diff(x){ var d = []; for(var i = 1; i < x.length; i++){ d.push(x[i] - x[i - 1]) } return d }

function nanmean(x){                     // pandas mean: NaN skipped
  var v = x.filter(a => !isNaN(a))
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : NaN
}

// ─── tapping (python_port/tap.py) ────────────────────────────────────────────
function tapMedianDiff(t){ return t.length > 1 ? median(diff(t)) : NaN }

function tapVariability(t){
  if(t.length < 2){ return NaN }
  var d = diff(t)
  var q1 = quantileHazen(d, .25), q3 = quantileHazen(d, .75), iqr = q3 - q1
  d = d.filter(v => v >= q1 - 1.5 * iqr && v <= q3 + 1.5 * iqr)
  var md = tapMedianDiff(t)
  if(md == 0 || d.length == 0){ return NaN }
  return (quantileHazen(d, .9) - quantileHazen(d, .1)) / md
}

function tapMetricLevel(t, bpm){
  if(t.length < 2){ return { bpm: NaN, confidence: NaN } }
  var performed = 60000 / tapMedianDiff(t)
  var levels = [bpm / 2, bpm, bpm * 2]
  var order = [0, 1, 2].sort((a, b) => Math.abs(levels[a] - performed) - Math.abs(levels[b] - performed))
  var d0 = Math.abs(levels[order[0]] - performed), d1 = Math.abs(levels[order[1]] - performed)
  return { bpm: levels[order[0]], confidence: 1 - d0 / d1 }
}

function tapKuramoto(t, bpm){
  if(t.length < 2){ return NaN }
  var ibi = 60000 / tapMetricLevel(t, bpm).bpm, re = 0, im = 0
  t.forEach(v => { re += Math.cos(2 * Math.PI * v / ibi); im += Math.sin(2 * Math.PI * v / ibi) })
  return Math.hypot(re / t.length, im / t.length)
}

function splitByTempoChanges(t, tc){     // half-open windows (prev, cur]
  var out = [t.filter(v => v <= tc[0])]
  for(var i = 0; i < tc.length - 1; i++){ out.push(t.filter(v => v > tc[i] && v <= tc[i + 1])) }
  out.push(t.filter(v => v > tc[tc.length - 1]))
  return out
}

// taps: tap times in ms from audio start (jsPsych `rt` array of the tapping trial)
// ann: {bpms, tempoChanges (ms), beatTimes (ms)}
// Returns per-segment values and the trial means that trial_scores.py reports.
function tapFeatures(taps, ann){
  var asc = (a, b) => a - b
  var tc = Array.from(ann.tempoChanges).sort(asc)
  var segs = splitByTempoChanges(Array.from(taps).sort(asc), tc)
  var beats = splitByTempoChanges(Array.from(ann.beatTimes).sort(asc), tc)
  var rows = segs.map((u, i) => {
    var t = u.filter(v => v > beats[i][2])          // drop taps before the 3rd beat
    var ml = tapMetricLevel(t, ann.bpms[i])
    var iti = tapMedianDiff(t)
    return { itic: iti, variability: tapVariability(t), period_conf: ml.confidence,
             tempo_accuracy: Math.abs(60000 / iti - ml.bpm),
             phase_sync: tapKuramoto(u, ann.bpms[i]) }  // untrimmed, as in the MATLAB
  })
  var trial = {}
  ;["variability", "tempo_accuracy", "period_conf", "phase_sync"].forEach(f => trial[f] = nanmean(rows.map(r => r[f])))
  trial.valid_iti = rows.some(r => !isNaN(r.itic))
  return { segments: rows, trial: trial }
}

// ─── movement periodicity (python_port/movement.py) ──────────────────────────
var MOVEMENT_FS = 100

// samples: [{t, x, y, z}] as recorded by extension-accelerometer.js
function movementUpsample(samples){
  var rows = samples.filter(s => s.x !== null && s.y !== null && s.z !== null &&
                                 !isNaN(s.x) && !isNaN(s.y) && !isNaN(s.z))
  var seen = new Set(), u = []
  rows.forEach(s => { if(!seen.has(s.t)){ seen.add(s.t); u.push(s) } })   // unique, stable
  var sorted = u.slice().sort((a, b) => a.t - b.t)                        // interp1 sorts X
  var t0 = rows[0].t, t1 = rows[rows.length - 1].t, step = 1000 / MOVEMENT_FS
  var n = Math.ceil((t1 + 1e-9 - t0) / step), out = { t: [], x: [], y: [], z: [] }
  var xp = sorted.map(s => s.t), last = xp.length - 1
  for(var i = 0; i < n; i++){
    var tt = t0 + i * step
    out.t.push(tt)
    if(tt <= xp[0] || tt >= xp[last]){          // np.interp clamps to the end values
      var e = tt <= xp[0] ? sorted[0] : sorted[last]
      ;["x", "y", "z"].forEach(k => out[k].push(e[k]))
      continue
    }
    var lo = 0, hi = last                        // largest lo with xp[lo] <= tt
    while(hi - lo > 1){ var mid = (lo + hi) >> 1; if(xp[mid] <= tt){ lo = mid } else { hi = mid } }
    var w = (tt - xp[lo]) / (xp[lo + 1] - xp[lo])
    ;["x", "y", "z"].forEach(k => out[k].push(sorted[lo][k] + w * (sorted[lo + 1][k] - sorted[lo][k])))
  }
  return out
}

// First principal component score (sign arbitrary, as in MATLAB/numpy)
function movementFirstPCA(u){
  var n = u.t.length, k = ["x", "y", "z"], m = k.map(c => u[c].reduce((a, b) => a + b, 0) / n)
  var X = k.map((c, i) => u[c].map(v => v - m[i]))
  var C = [0, 1, 2].map(i => [0, 1, 2].map(j => X[i].reduce((s, v, r) => s + v * X[j][r], 0)))
  var v = jacobiTopEigenvector(C)
  return X[0].map((_, r) => X[0][r] * v[0] + X[1][r] * v[1] + X[2][r] * v[2])
}

function jacobiTopEigenvector(A){        // symmetric 3x3
  var a = A.map(r => r.slice()), V = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
  for(var sweep = 0; sweep < 50; sweep++){
    var off = Math.abs(a[0][1]) + Math.abs(a[0][2]) + Math.abs(a[1][2])
    if(off < 1e-300){ break }
    [[0, 1], [0, 2], [1, 2]].forEach(([p, q]) => {
      if(a[p][q] === 0){ return }
      var th = (a[q][q] - a[p][p]) / (2 * a[p][q])
      var t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c
      for(var r = 0; r < 3; r++){ var arp = a[r][p], arq = a[r][q]; a[r][p] = c * arp - s * arq; a[r][q] = s * arp + c * arq }
      for(var r = 0; r < 3; r++){ var apr = a[p][r], aqr = a[q][r]; a[p][r] = c * apr - s * aqr; a[q][r] = s * apr + c * aqr }
      for(var r = 0; r < 3; r++){ var vrp = V[r][p], vrq = V[r][q]; V[r][p] = c * vrp - s * vrq; V[r][q] = s * vrp + c * vrq }
    })
  }
  var top = [0, 1, 2].reduce((b, i) => a[i][i] > a[b][b] ? i : b, 0)
  return [V[0][top], V[1][top], V[2][top]]
}

// periodicityStrength.m: largest autocorrelation peak / zero lag. The peak is
// sampled at k, one lag before the true peak k+1 (MATLAB bug, kept on purpose).
function movementPeriodicityStrength(x){
  var n = x.length
  if(n == 0){ return 0 }
  var xc = new Float64Array(n)
  for(var k = 0; k < n; k++){ var s = 0; for(var i = 0; i + k < n; i++){ s += x[i] * x[i + k] } xc[k] = s }
  var best = -Infinity
  for(var k = 0; k + 2 < n; k++){
    var d1 = Math.sign(xc[k + 1] - xc[k]), d2 = Math.sign(xc[k + 2] - xc[k + 1])
    if(d2 - d1 < 0 && xc[k] > best){ best = xc[k] }
  }
  return (best === -Infinity || xc[0] === 0) ? 0 : best / xc[0]
}

// ann: {tempoChanges (ms)} or null for the silence trial. Returns per-segment
// strength and the trial mean (= `period_conf` in movement/trial_scores.py).
function movementPeriodConf(samples, ann){
  var u = movementUpsample(samples), pc = movementFirstPCA(u)
  if(!ann){ var s = movementPeriodicityStrength(pc); return { segments: [s], trial: s } }
  var tc = ann.tempoChanges, idx = u.t.map((_, i) => i)
  var segs = splitByTempoChanges(idx.map(i => u.t[i]), tc)            // times per segment
  var bounds = [], start = 0
  segs.forEach(s => { bounds.push([start, start + s.length]); start += s.length })
  // segments are contiguous because upsampled time is monotonic
  var st = bounds.map(([a, b]) => movementPeriodicityStrength(pc.slice(a, b)))
  return { segments: st, trial: nanmean(st) }
}

// ─── one trial, with the pipeline's filters ──────────────────────────────────
// Stimulus path or file name -> annotation key (as processBatteries/tap.py and
// the slice.py scripts strip it)
function featureStimulusKey(stimulus){
  return String(stimulus).split("/").pop().replace(/\.(mp3|wav)$/, "")
}

// Tapping Variability of one trial (`variability` in tap/trial_scores.py), or
// null where the pipeline has no value: silence, <= 10 taps (run_tap.py), no
// annotation, or no valid inter-tap interval (valid_iti).
// rt: the trial's `rt` array (tap times in ms from audio start).
function tapTrialVariability(rt, stimulus, annotations){
  var key = featureStimulusKey(stimulus), ann = annotations[key]
  var taps = (rt || []).map(Number).filter(v => isFinite(v))
  if(key == "silence" || !ann || taps.length <= 10){ return null }
  var f = tapFeatures(taps, ann)
  if(!f.trial.valid_iti || !isFinite(f.trial.variability)){ return null }
  return f.trial.variability
}

// Movement PeriodConf of one trial (`period_conf` in movement/trial_scores.py),
// or null where the pipeline has no value or drops the trial: silence, <= 5
// samples or no usable time axis (run_movement.py), dead sensor (trial_qc.py),
// no annotation.
// accel: the trial's `accelerometer_data` ([{x: [], y: [], z: [], t: [], ...}]).
function movementTrialPeriodConf(accel, stimulus, annotations){
  var key = featureStimulusKey(stimulus), ann = annotations[key]
  var a = Array.isArray(accel) ? accel[0] : accel
  if(key.indexOf("silence") !== -1 || !ann || !a || !a.t){ return null }
  var num = v => (v === null || v === undefined) ? NaN : Number(v)
  // stage2/movement.csv is sorted by t (stable, missing t last) before slicing
  var samples = a.t.map((t, i) => ({ t: num(t), x: num(a.x[i]), y: num(a.y[i]), z: num(a.z[i]), i: i }))
    .sort((p, q) => (isNaN(p.t) - isNaN(q.t)) || (isNaN(p.t) ? 0 : p.t - q.t) || (p.i - q.i))
  if(samples.length <= 5){ return null }
  // trial_qc.py: dead sensor (computed on all samples; NaN never flags)
  if(samples.length >= 50){
    var ss = 0, zero = 0
    samples.forEach(s => { ss += s.x * s.x + s.y * s.y + s.z * s.z; if(Math.abs(s.x) + Math.abs(s.y) + Math.abs(s.z) === 0){ zero++ } })
    if(Math.sqrt(ss / samples.length) < 0.5 || zero / samples.length > 0.5){ return null }
  }
  // run_movement.py: drop rows with missing x/y/z (rows with missing t stay),
  // then the first and last t must be finite and increasing
  var ok = samples.filter(s => !isNaN(s.x) && !isNaN(s.y) && !isNaN(s.z))
  if(ok.length < 2 || !isFinite(ok[0].t) || !isFinite(ok[ok.length - 1].t) || !(ok[ok.length - 1].t > ok[0].t)){ return null }
  var r = movementPeriodConf(ok, ann).trial
  return isFinite(r) ? r : null
}

if(typeof module !== "undefined"){
  module.exports = { quantileHazen, tapFeatures, movementUpsample, movementFirstPCA,
                     movementPeriodicityStrength, movementPeriodConf,
                     featureStimulusKey, tapTrialVariability, movementTrialPeriodConf }
}
