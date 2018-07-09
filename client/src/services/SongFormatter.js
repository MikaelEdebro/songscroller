export default class SongFormatter {
  constructor(song) {
    this.song = song.trim().insert(0, '\n')
  }

  removeWhitespaceOnEndOfRow = () => {
    this.song.replace(/ {1,}\n/g, '\n')

    return this
  }

  highlightChordRows = () => {
    const replaceString = '\n<chord-row>$1</chord-row>\n'
    this.song = this.song
      .replace(/\n(.* {2,}.*)\n/g, replaceString)
      .replace(/\n(\w{1,3})\n/g, replaceString)

    return this
  }

  highlightChords = () => {
    let song = this.song
    const chordRowPattern = /<chord-row>(.*)<\/chord-row>/g
    const chordPattern = /[\S\d?/?]{1,}/g

    let rowMatch
    while ((rowMatch = chordRowPattern.exec(song))) {
      const chordRow = rowMatch[0].replace(/<\/?chord-row>/g, '')
      let chordRowWithAddedChords = chordRow
      let matches = []

      let chordMatch
      while ((chordMatch = chordPattern.exec(chordRow))) {
        matches.push({ index: chordMatch.index, value: chordMatch[0] })
      }

      matches.reverse().forEach(({ index, value }) => {
        chordRowWithAddedChords = chordRowWithAddedChords.replaceBetween(
          index,
          index + value.length,
          `<chord>${value}</chord>`
        )
      })
      song = song.replace(rowMatch[0], `<chord-row>${chordRowWithAddedChords}</chord-row>`)
    }

    this.song = song

    return this
  }

  replaceRowBreaks = () => {
    this.song = this.song.replace(/\n/g, '<br>')
    return this
  }

  getFormattedSong = () => {
    return this.song
  }
}
