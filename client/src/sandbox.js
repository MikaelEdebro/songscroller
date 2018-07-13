const SCALE = [
  { baseNote: 'Cb', scale: ['Cb', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'] },
  { baseNote: 'C', scale: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] },
  { baseNote: 'C#', scale: ['C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'] },
  { baseNote: 'Db', scale: ['Db', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'] },
  { baseNote: 'D', scale: ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'] },
  { baseNote: 'D#', scale: ['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'] },
  { baseNote: 'Eb', scale: ['Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'] },
  { baseNote: 'E', scale: ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'] },
  { baseNote: 'Fb', scale: ['Fb', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'] },
  { baseNote: 'F', scale: ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'] },
  { baseNote: 'F#', scale: ['F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F'] },
  { baseNote: 'Gb', scale: ['Gb', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F'] },
  { baseNote: 'G', scale: ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'] },
  { baseNote: 'G#', scale: ['G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'] },
  { baseNote: 'Ab', scale: ['Ab', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'] },
  { baseNote: 'A', scale: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'] },
  { baseNote: 'A#', scale: ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'] },
  { baseNote: 'Bb', scale: ['Bb', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'] },
  { baseNote: 'B', scale: ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'] },
]

const transposeChord = (chord, semitones, scale) => {
  const strippedChord = chord.value.replace(/<\/?chord>/g, '')
  const chordMatch = strippedChord.match(/^(Cb|C#|C|Db|D#|D|Eb|E|Fb|F#|F|Gb|G#|G|Ab|A#|A|Bb|B)/gi)

  if (!chordMatch) {
    // TODO: Log this so I know the chords not being catched by the algorithm
    console.log('chord not found')
    return chord
  }
  const baseNote = chordMatch[0]
  const note = scale.find(s => s.baseNote.toLowerCase() === baseNote.toLowerCase())

  // make sure it doesn't break if semitones is negative value
  const scaleIndex = semitones < 0 ? semitones + 12 : semitones
  let newChord = note.scale[scaleIndex] + strippedChord.substring(baseNote.length)

  newChord = transposeAlternateBaseNote(newChord, semitones, scale)
  // TODO: also transpose alternate root note, ex: G/B
  return { ...chord, value: `<chord>${newChord}</chord>` }
}

const transposeAlternateBaseNote = (chord, semitones, scale) => {
  const alternateBaseNoteIndex = chord.indexOf('/')
  if (alternateBaseNoteIndex < 0) {
    return chord
  }
  const alternateBaseNote = chord.substring(alternateBaseNoteIndex + 1)
  const alternateBaseNoteScale = scale.find(
    s => s.baseNote.toLowerCase() === alternateBaseNote.toLowerCase()
  )
  if (!alternateBaseNoteScale) {
    return chord
  }

  const newChord =
    chord.substring(0, alternateBaseNoteIndex + 1) + alternateBaseNoteScale.scale[semitones]

  console.log(alternateBaseNoteIndex)
  console.log(alternateBaseNote)
  console.log(alternateBaseNoteScale)
  console.log(newChord)
  return newChord
}

const chord = { value: 'A/C#' }
console.log(transposeChord(chord, 4, SCALE))
