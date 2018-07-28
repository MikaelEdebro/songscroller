import React from 'react'
import styled from 'styled-components'
import SongMenu from './SongMenu'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import SongFormatter from '../../services/SongFormatter'
import SongTransposer from '../../services/SongTransposer'
import siteConfig from '../../siteConfig'

const SongWrapper = styled(Paper)`
  padding: 10px;
  white-space: pre;
  overflow-x: hidden;
  margin: 5px auto;
  max-width: 1024px;
  width: 100%;

  @media (min-width: 600px) {
    padding: 15px 25px;
    margin: 20px auto;
  }

  .time {
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
  }
  chord {
    color: violet;
    font-weight: bold;
  }
`

const BodyWrapper = styled.div`
  font-family: ${props => (props.useMonospaceFont ? 'Roboto Mono' : 'Roboto')};
  font-size: ${props => props.fontSize}px;
  padding-bottom: ${siteConfig.songControlsHeight + 10}px;
`

class Song extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formattedBody: new SongFormatter(this.props.song.body)
        .removeWhitespaceOnEndOfRow()
        .replaceTabsForSpaces()
        .highlightChordRows()
        .highlightChords()
        .replaceRowBreaks()
        .getFormattedSong(),
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.song && prevProps.song.transpose !== this.props.song.transpose) {
      this.setState(prevState => ({
        formattedBody: new SongTransposer(prevState.formattedBody)
          .transposeSong(this.props.song.transpose || 0)
          .getTransposedSong(),
      }))
    }
  }

  render() {
    if (!this.props.song) {
      return <CircularProgress size={50} />
    }

    const { artist, title } = this.props.song

    return (
      <SongWrapper>
        <Grid container alignItems="flex-start">
          <Grid item xs={10} onClick={this.props.clicked}>
            <Typography variant="caption">{artist}</Typography>
            <Typography variant="title">{title}</Typography>
          </Grid>
          <Grid item xs={2} align="right">
            <SongMenu song={this.props.song} />
          </Grid>
        </Grid>
        <Typography component="div">
          <BodyWrapper
            fontSize={this.props.fontSize}
            useMonospaceFont={this.props.song.useMonospaceFont}
            dangerouslySetInnerHTML={{ __html: this.state.formattedBody }}
            onClick={this.props.clicked}
          />
        </Typography>
      </SongWrapper>
    )
  }
}

export default Song
