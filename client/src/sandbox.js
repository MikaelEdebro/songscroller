/* eslint-disable */
String.prototype.insert = function(index, string) {
  if (index > 0) return this.substring(0, index) + string + this.substring(index, this.length)
  else return string + this
}
String.prototype.removeWhitespaceOnEndOfRow = function() {
  return this.toString().replace(/ {1,}\n/g, '\n')
}
String.prototype.highlightChordRows = function() {
  const replaceString = '\n<chord-row>$1</chord-row>\n'
  let self = this.toString().replace(/\n(.* {2,}.*)\n/g, replaceString)
  self = self.replace(/\n(\w{1,3})\n/g, replaceString)
  return self
}
String.prototype.highlightChords = function() {
  const song = this.toString()
  const chordRowPattern = /<chord-row>(.*)<\/chord-row>/g
  const chordPattern = /\S{1,}/g
  let formattedSong = song

  while ((match = chordRowPattern.exec(song))) {
    const chordRow = match[0].replace('<chord-row>', '').replace('</chord-row>', '')
    let chordRowWithAddedChords = chordRow
    //console.log(chordRow)
    while ((chord = chordPattern.exec(chordRow))) {
      chordRowWithAddedChords = chordRowWithAddedChords.replace(
        chord[0],
        `<chord type="${chord[0]}">${chord[0]}</chord>`
      )
      //console.log(chord)
      //console.log(chordRowWithAddedChords)
    }

    formattedSong = formattedSong.replace(
      match[0],
      `<chord-row>${chordRowWithAddedChords}</chord-row>`
    )
  }

  console.log(formattedSong)

  return formattedSong
}
String.prototype.replaceWhiteSpace = function() {
  return this.toString().replace(/ /g, '&nbsp;')
}
String.prototype.replaceRowBreaks = function() {
  return this.toString().replace(/\n/g, '<br>')
}

let song = `Csus4                                                Am\nI am just a poor boy, though my story's seldom told\n            G\nI have squandered my resistance\n      G7           G6               C\n`

const formattedSong = song
  .trim()
  .insert(0, '\n')
  .removeWhitespaceOnEndOfRow()
  .highlightChordRows()
  .highlightChords()
  .replaceRowBreaks()

//console.log(formattedSong)
