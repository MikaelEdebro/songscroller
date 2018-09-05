import '../prototypes'
import SongFormatter from './SongFormatter'

describe('SongFormatter', () => {
  test('normal maj/min chords', () => {
    const song = `
            A                Em    A
    There’s something in the way she moves
       Em       D       G        A
    Or looks my way, or calls my name`

    const formattedSong = formatSong(song)
    expect(formattedSong).toContain('<chord>A</chord>')
    expect(formattedSong).toContain('<chord>Em</chord>')
    expect(formattedSong).toContain('<chord>D</chord>')
    expect(formattedSong).toContain('<chord>G</chord>')
  })

  test('alternative base note chords (G/B)', () => {
    const song = `
            C/G                Emaj7    G/B
    There’s something in the way she moves
       D/F#    C     F#
    Or looks my way, or calls my name`

    const formattedSong = formatSong(song)
    expect(formattedSong).toContain('<chord>C/G</chord>')
    expect(formattedSong).toContain('<chord>G/B</chord>')
    expect(formattedSong).toContain('<chord>D/F#</chord>')
  })

  test('7th, 9th, 11th chords etc', () => {
    const song = `
            Gmaj7                E7    E9
    There’s something in the way she moves
       F#maj7      D7
    Or looks my way, or calls my name`

    const formattedSong = formatSong(song)
    expect(formattedSong).toContain('<chord>Gmaj7</chord>')
    expect(formattedSong).toContain('<chord>E7</chord>')
    expect(formattedSong).toContain('<chord>E9</chord>')
    expect(formattedSong).toContain('<chord>F#maj7</chord>')
    expect(formattedSong).toContain('<chord>D7</chord>')
  })

  test('sus chords', () => {
    const song = `
        Dsus2     Dsus4      G     Gsus4
    There’s something in the way she moves
           F
    Or looks my way, or calls my name`

    const formattedSong = formatSong(song)
    expect(formattedSong).toContain('<chord>Dsus2</chord>')
    expect(formattedSong).toContain('<chord>Dsus4</chord>')
    expect(formattedSong).toContain('<chord>Gsus4</chord>')
  })

  test('correctly replaces tabs with spaces', () => {
    const song = `
          D       G       Am
    There’s something in the way she moves
        Em      F       C
    Or looks my way, or calls my name`

    const formattedSong = formatSong(song)
    expect(formattedSong).toContain('<chord>D</chord>')
    expect(formattedSong).toContain('<chord>G</chord>')
    expect(formattedSong).toContain('<chord>Am</chord>')
    expect(formattedSong).toContain('<chord>Em</chord>')
    expect(formattedSong).toContain('<chord>F</chord>')
    expect(formattedSong).toContain('<chord>C</chord>')
  })

  test('spanish chord names (DO, RE, MI etc)', () => {
    const song = `
          RE       LA       LA7
    There’s something in the way she moves
    SOLsus2       Re7
    Or looks my way, or calls my name`

    const formattedSong = formatSong(song)
    expect(formattedSong).toContain('<chord>RE</chord>')
    expect(formattedSong).toContain('<chord>LA</chord>')
    expect(formattedSong).toContain('<chord>LA7</chord>')
    expect(formattedSong).toContain('<chord>SOLsus2</chord>')
    expect(formattedSong).toContain('<chord>Re7</chord>')
  })

  test('it does not include | in chord', () => {
    const song = `
    |A     Em9   |A     Em9   |A     Em9   |A     Em9   |
    Some lyrics dragons thunder love sorrow hamburgers
    `

    const formattedSong = formatSong(song)
    expect(formattedSong).toContain('<chord>A</chord>')
    expect(formattedSong).toContain('<chord>Em9</chord>')
  })

  test('handles alternative base notes with backslash (G\\B)', () => {
    const song = `
    A    A7     G\\B    C                          D
    preguntar -me urge-, ?que tipo de adjetivos
    `

    const formattedSong = formatSong(song)
    expect(formattedSong).toContain('<chord>G\\B</chord>')
  })

  test('divides into sections for desktop formatting', () => {
    const song = `
    A    A7     G\\B    C                          D
    preguntar -me urge-, ?que tipo de adjetivos

    A    G   F7
    Sing along
    `

    const formattedSong = formatSong(song)
    expect(formattedSong).toContain('<br><br><section>')
  })
})

function formatSong(song) {
  return new SongFormatter(song)
    .removeWhitespaceOnEndOfRow()
    .replaceTabsForSpaces()
    .highlightChordRows()
    .highlightChords()
    .replaceRowBreaks()
    .divideIntoSections()
    .getFormattedSong()
}
