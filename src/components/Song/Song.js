import React from 'react'
import { getMinutesFromSeconds } from 'core/helpers'
import styled from 'styled-components'
import MaterialIcon from 'components/UI/MaterialIcon'

const SongWrapper = styled.div`
  font-family: 'Open Sans', sans-serif;
  padding: 10px;
  margin: 0;
  white-space: pre;
  max-width: 100%;
  transition: font-size 0.5s;
  header {
    white-space: normal;
    display: flex;
    justify-content: space-between;
  }
  h3 {
    margin: 0;
  }
  .chord-row {
    color: violet;
    font-weight: bold;
  }
`

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
      <SongWrapper id="song" className="song">
        <header>
          <h3>
            {artist} - {title} ({getMinutesFromSeconds(seconds)})
          </h3>
          <MaterialIcon type="more_vert" />
        </header>
        <div
          className="body"
          dangerouslySetInnerHTML={{ __html: formattedSong }}
          onClick={this.props.clicked}
        />
      </SongWrapper>
    )
  }
}

export default Song
