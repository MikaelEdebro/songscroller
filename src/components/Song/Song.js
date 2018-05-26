import React from 'react'
import { getMinutesFromSeconds } from 'core/helpers'
import styled from 'styled-components'
import SongMenu from './SongMenu'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const SongWrapper = styled.div`
  padding: 10px;
  margin: 0;
  white-space: pre;
  transition: font-size 0.5s;

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
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="headline" component="h3">
              {artist} - {title} ({getMinutesFromSeconds(seconds)})
            </Typography>
          </Grid>
          <Grid item>
            <SongMenu />
          </Grid>
        </Grid>

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
