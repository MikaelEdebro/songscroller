/* eslint-disable */
String.prototype.insert = function(index, string) {
  if (index > 0) return this.substring(0, index) + string + this.substring(index, this.length)
  else return string + this
}
String.prototype.removeWhitespaceOnEndOfRow = function() {
  return this.toString().replace(/ {1,}\n/g, '\n')
}
String.prototype.highlightChordRows = function() {
  let self = this.toString().replace(/\n(.*\s{2,}.*)\n/g, '\n<span class="chord-row">$1</span>\n')
  self = self.replace(/\n(\w{1,3})\n/g, '\n<span class="chord-row">$1</span>\n')
  return self
}
String.prototype.highlightChords = function() {
  // let matches = this.toString().match(/<span class="chord-row">(.*)<\/span>/g)
  // console.log('matches', matches)

  // (\w{1,4})
  return this.toString()
}
String.prototype.replaceWhiteSpace = function() {
  return this.toString().replace(/ /g, '&nbsp;')
}
String.prototype.replaceRowBreaks = function() {
  return this.toString().replace(/\n/g, '<br>')
}
