import React from 'react'
import styled from 'styled-components'
import SongMenu from './SongMenu'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const SongWrapper = styled.div`
  padding: 10px;
  margin: 0;
  white-space: pre;
  transition: font-size 0.5s;

  @media (min-width: 600px) {
    padding: 15px 25px;
  }

  h3 {
    margin: 0;
  }
  .time {
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
  }
  .chord-row {
    color: violet;
    font-weight: bold;
  }
`

class Song extends React.Component {
  render() {
    if (!this.props.song) {
      return <CircularProgress size={50} />
    }

    const { artist, title, body, _id } = this.props.song
    const formattedSong = body
      .trim()
      .insert(0, '\n')
      .removeWhitespaceOnEndOfRow()
      .highlightChordRows()
      .highlightChords()
      .replaceRowBreaks()

    return (
      <SongWrapper>
        <Grid container alignItems="flex-start" justify="space-between">
          <Grid item>
            <Typography variant="caption">{artist}</Typography>
            <Typography variant="title">{title}</Typography>
          </Grid>
          <Grid item>
            <SongMenu songId={_id} />
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
