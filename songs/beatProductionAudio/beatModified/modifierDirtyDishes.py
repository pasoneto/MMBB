import numpy as np
import soundfile
from pydub import AudioSegment

def createBeat(segundosSegment, beats, shiftN, beat, name, repetitions):
    
    segundosSegment = segundosSegment*1000
    segundosSegment = segundosSegment/beats
    segundosEight = segundosSegment/8

    silentDurationOneBeat = segundosEight - len(beat)

    silent = AudioSegment.silent(duration=silentDurationOneBeat)
    silentEighth = AudioSegment.silent(duration=segundosEight)
    soundBeatEighth = beat + silent

    beatPosition = [1, 0, 0, 0, 0, 0, 0, 0]

    structure = np.roll(beatPosition, shiftN)
    mergeBeat = AudioSegment.empty()
    for k in structure:
        if k == 1:
            mergeBeat = mergeBeat+soundBeatEighth
        else:
            mergeBeat = mergeBeat+silentEighth

    bar = AudioSegment.empty()
    for i in range(repetitions):
        bar = bar + mergeBeat

    bar.export(f"./dirtyDishesBeats/{name}_{shiftN}.wav", format="wav")

beat = AudioSegment.from_wav("./beatUnit.wav")

sr = 75 #Sampling rate used to measure nSamples of excerpt
beats = 4*4 #How many beats happen throughout all of the segment
frames = 891 #Number of frames within excerpt

segundosSegment = frames/sr #How many seconds does the whole segment have
segundosBeat = segundosSegment/beats

repetitions = beats*8 #How many repetitions for each segment should the output have

#The output of this function will not be exactly the same as the length of the excerpt used as model.
#Excerpt should then be trimmed to fit perfectly with output of this function
#Then I come back here and set the number of repertitions to cover how many segments I want for each trial
createBeat(segundosSegment, beats, 0, beat, "metronome", repetitions)
createBeat(segundosSegment, beats, 1, beat, "metronome", repetitions)
createBeat(segundosSegment, beats, 2, beat, "metronome", repetitions)
createBeat(segundosSegment, beats, 3, beat, "metronome", repetitions)
createBeat(segundosSegment, beats, 4, beat, "metronome", repetitions)
createBeat(segundosSegment, beats, 5, beat, "metronome", repetitions)
createBeat(segundosSegment, beats, 6, beat, "metronome", repetitions)
createBeat(segundosSegment, beats, 7, beat, "metronome", repetitions)
