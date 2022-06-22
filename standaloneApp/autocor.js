// accepts a timeDomainBuffer and multiplies every value
function autoCorrelate(timeDomainBuffer) {
  
  var nSamples = timeDomainBuffer.length;

  var autoCorrBuffer = [];
  for (var lag = 0; lag < nSamples; lag++){
    var sum = 0; 
    for (var index = 0; index < nSamples-lag; index++){
      var indexLagged = index+lag;
      var sound1 = timeDomainBuffer[index];
      var sound2 = timeDomainBuffer[indexLagged];
      var product = sound1 * sound2;
      sum += product;
    }

    // average to a value between -1 and 1
    autoCorrBuffer[lag] = sum/nSamples;
  }

  return autoCorrBuffer;
}

// Calculate the fundamental frequency of a buffer
// by finding the peaks, and counting the distance
// between peaks in samples, and converting that
// number of samples to a frequency value.
function findFrequency(autocorr, sampleRate) {

  var nSamples = autocorr.length;
  var valOfLargestPeakSoFar = 0;
  var indexOfLargestPeakSoFar = -1;

  for (var index = 1; index < nSamples; index++){
    var valL = autocorr[index-1];
    var valC = autocorr[index];
    var valR = autocorr[index+1];

    var bIsPeak = ((valL < valC) && (valR < valC));
    if (bIsPeak){
      if (valC > valOfLargestPeakSoFar){
        valOfLargestPeakSoFar = valC;
        indexOfLargestPeakSoFar = index;
      }
    }
  }
  
  var distanceToNextLargestPeak = indexOfLargestPeakSoFar - 0;

  // convert sample count to frequency
  var fundamentalFrequency = sampleRate / distanceToNextLargestPeak;
  return fundamentalFrequency;
}
