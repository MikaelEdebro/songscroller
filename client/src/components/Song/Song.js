import React from 'react'
import styled from 'styled-components'
import SongMenu from './SongMenu'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import SongFormatter from '../../services/SongFormatter'

const SongWrapper = styled(Paper)`
  padding: 10px;
  white-space: pre;
  overflow-x: hidden;
  margin: 5px auto;
  max-width: 1200px;
  width: 100%;

  @media (min-width: 600px) {
    padding: 15px 25px;
    margin: 20px auto;
  }

  h3 {
    margin: 0;
  }
  .time {
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
  }
  .body {
    font-family: 'Roboto Mono', monospace;
    letter-spacing: -1px;
  }
  chord {
    color: violet;
    font-weight: bold;
  }
`

class Song extends React.Component {
  constructor(props) {
    super(props)
    this.formattedSong = new SongFormatter(this.props.song.body)
      .removeWhitespaceOnEndOfRow()
      .replaceTabsForSpaces()
      .highlightChordRows()
      .highlightChords()
      .replaceRowBreaks()
      .getFormattedSong()
  }
  render() {
    if (!this.props.song) {
      return <CircularProgress size={50} />
    }

    const { artist, title, _id, seconds } = this.props.song

    return (
      <SongWrapper>
        <Grid container alignItems="flex-start" justify="space-between">
          <Grid item>
            <Typography variant="caption">{artist}</Typography>
            <Typography variant="title">
              {title} ({seconds})
            </Typography>
          </Grid>
          <Grid item>
            <SongMenu songId={_id} />
          </Grid>
        </Grid>

        <div
          className="body"
          style={{ paddingBottom: '100px', fontSize: this.props.fontSize + 'px' }}
          dangerouslySetInnerHTML={{ __html: this.formattedSong }}
          onClick={this.props.clicked}
        />
      </SongWrapper>
    )
  }
}

export default Song
