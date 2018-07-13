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

  test('transposes normal minor chords correctly', () => {
    const semitones = 3
    const song = getOriginalChords(true)
    const transposedExpectedResult = getTransposedChords(true, semitones)

    const transposedSong = new SongTransposer(song).transposeSong(semitones).getTransposedSong()
    expect(transposedSong).toEqual(transposedExpectedResult)
  })

  test('it keeps the chord additions', () => {
    const semitones = 1
    const song = '<chord>Fm7</chord><chord>Gsus4</chord>'
    const transposedSong = new SongTransposer(song).transposeSong(semitones).getTransposedSong()
    expect(transposedSong).toEqual('<chord>F#m7</chord><chord>G#sus4</chord>')
  })

  test('it transposes alternate root notes (eg G/B)', () => {
    const semitones = 1
    const song = '<chord>G/B</chord>'
    const transposedSong = new SongTransposer(song).transposeSong(semitones).getTransposedSong()
    expect(transposedSong).toEqual('<chord>G#/C</chord>')
  })

  test('test different chord variants (just random chords)', () => {
    const chords = [
      { initial: 'G/B', semitones: 1, expected: 'G#/C' },
      { initial: 'F#m11/E', semitones: -2, expected: 'Em11/D' },
      { initial: 'D7', semitones: -11, expected: 'D#7' },
      { initial: 'D7', semitones: -12, expected: 'D7' },
      { initial: 'Bm5-/7', semitones: 2, expected: 'C#m5-/7' },
      { initial: 'A7M', semitones: 5, expected: 'D7M' },
      { initial: 'C#m7', semitones: -3, expected: 'A#m7' },
      { initial: 'C#m5-/7', semitones: 5, expected: 'F#m5-/7' },
      { initial: 'Bbdim', semitones: -1, expected: 'Adim' },
      { initial: 'Asus', semitones: 8, expected: 'Fsus' },
      { initial: 'Em7', semitones: -3, expected: 'C#m7' },
      { initial: 'Am6', semitones: -5, expected: 'Em6' },
    ]
    chords.forEach(({ initial, semitones, expected }) => {
      expect(
        new SongTransposer(`<chord>${initial}</chord>`).transposeSong(semitones).getTransposedSong()
      ).toEqual(`<chord>${expected}</chord>`)
    })
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
