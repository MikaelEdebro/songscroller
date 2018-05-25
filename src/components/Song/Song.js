import React from 'react'
import { getMinutesFromSeconds } from 'core/helpers'
import './Song.css'

class Song extends React.Component {
  render() {
    const { artist, title, seconds, body } = this.props.song
    const formattedSong = body
      .trim()
      .insert(0, '\n')
      .removeWhitespaceOnEndOfRow()
      .highlightChordRows()
      .highlightChords()
      .replaceRowBreaks()

    return (
      <div id="song" className="song" onClick={this.props.clicked}>
        <header>
          <h3>
            {artist} - {title} ({getMinutesFromSeconds(seconds)})
          </h3>
        </header>
        <div className="body" dangerouslySetInnerHTML={{ __html: formattedSong }} />
      </div>
    )
  }
}

export default Song
