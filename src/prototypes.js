/* eslint-disable */
String.prototype.insert = function(index, string) {
  if (index > 0) return this.substring(0, index) + string + this.substring(index, this.length)
  else return string + this
}
String.prototype.removeWhitespaceOnEndOfRow = function() {
  return this.toString().replace(/ {1,}\n/g, '\n')
}
String.prototype.highlightChordRows = function() {
  return this.toString().replace(/\n(.*\s{2,}.*)\n/g, '\n<span class="chord-row">$1</span>\n')
}
String.prototype.highlightChords = function() {
  return this.toString()
}
String.prototype.replaceWhiteSpace = function() {
  return this.toString().replace(/ /g, '&nbsp;')
}
String.prototype.replaceRowBreaks = function() {
  return this.toString().replace(/\n/g, '<br>')
}
