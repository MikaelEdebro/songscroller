import '../prototypes'
import SongTransposer from './SongTransposer'

const SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

describe('SongTransposer', () => {
  test('transposes normal major chords correctly', () => {
    const semitones = 2
    const song = getOriginalChords(false)
    const transposedExpectedResult = getTransposedChords(false, semitones)

    const transposedSong = new SongTransposer(song).transposeSong(semitones).getTransposedSong()
    expect(transposedSong).toEqual(transposedExpectedResult)
  })

  test.only('transposes normal minor chords correctly', () => {
    const semitones = 3
    const song = getOriginalChords(true)
    const transposedExpectedResult = getTransposedChords(true, semitones)

    const transposedSong = new SongTransposer(song).transposeSong(semitones).getTransposedSong()
    expect(transposedSong).toEqual(transposedExpectedResult)
  })
})

function getOriginalChords(minor) {
  return SCALE.map(chord => `<chord>${chord}${minor ? 'm' : ''}</chord>`).join('')
}

function getTransposedChords(minor, semitones) {
  const transposedChords = []
  for (var i = 0; i < SCALE.length; i++) {
    let newIndex = i + semitones
    if (newIndex >= 12) {
      newIndex -= 12
    }
    transposedChords.push(SCALE[newIndex])
  }
  return transposedChords.map(chord => `<chord>${chord}${minor ? 'm' : ''}</chord>`).join('')
}
