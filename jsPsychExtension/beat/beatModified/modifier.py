import numpy as np
import soundfile
from pydub import AudioSegment

def createBeat(bpm, shiftN, beat, name):
    oneBeat = (1/bpm)*60000
    eighth = oneBeat/8
    silentDurationOneBeat = eighth - len(beat)

    silent = AudioSegment.silent(duration=silentDurationOneBeat)
    silentEighth = AudioSegment.silent(duration=eighth)
    soundBeatEighth = beat + silent

    beatPosition = [1, 0, 0, 0, 0, 0, 0, 0]

    structure = np.roll(beatPosition, shiftN)
    mergeBeat = AudioSegment.empty()
    for k in structure:
        if k == 1:
            mergeBeat = mergeBeat+soundBeatEighth
        else:
            mergeBeat = mergeBeat+silentEighth

    soundOneBar = mergeBeat+mergeBeat+mergeBeat+mergeBeat

    print(len(soundOneBar))

    bar = AudioSegment.empty()
    nBars = 20
    for i in range(nBars):
        bar = bar + soundOneBar

    bar.export(f"./{name}_{shiftN}.wav", format="wav")

beat = AudioSegment.from_wav("./beatUnit.wav")
bpm = 75.138

createBeat(bpm, 0, beat, "metronome")
createBeat(bpm, 1, beat, "metronome")
createBeat(bpm, 2, beat, "metronome")
createBeat(bpm, 3, beat, "metronome")
createBeat(bpm, 4, beat, "metronome")
createBeat(bpm, 5, beat, "metronome")
createBeat(bpm, 6, beat, "metronome")
createBeat(bpm, 7, beat, "metronome")
