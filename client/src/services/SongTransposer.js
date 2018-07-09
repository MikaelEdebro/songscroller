const SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export default class SongTransposer {
  constructor(song) {
    this.song = song
  }

  transposeSong = semitones => {
    if (!semitones) {
      return this
    }
    const chordPattern = /<chord>(.{1,7})<\/chord>/g

    const matches = []
    let chordMatch
    while ((chordMatch = chordPattern.exec(this.song))) {
      matches.push({
        index: chordMatch.index,
        value: chordMatch[0],
        initialLength: chordMatch[0].length,
      })
    }
    let transposedSong = this.song
    matches
      .map(match => this.transposeChord(match, semitones))
      .reverse()
      .forEach(({ index, value, initialLength }) => {
        transposedSong = transposedSong.replaceBetween(index, index + initialLength, value)
      })

    this.song = transposedSong

    return this
  }

  transposeChord = (chord, semitones) => {
    const strippedChord = chord.value.replace(/<\/?chord>/g, '')
    let scaleIndex = SCALE.findIndex(e => e === strippedChord)
    let newIndex = scaleIndex + semitones
    if (newIndex >= 12) {
      newIndex -= 12
    }
    return { ...chord, value: `<chord>${SCALE[newIndex]}</chord>` }
  }

  getTransposedSong = () => this.song
}
