import React from 'react'
import { connect } from 'react-redux'

import Song from './Song'
import SongControls from './SongControls'
import Wrapper from '../../hoc/Wrapper'
import * as actions from '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

class SongContainer extends React.Component {
  startTime = null
  offset = 0
  scrollSpeed = null

  state = {
    showOptions: false,
  }

  componentDidMount() {
    this.setState({ showSongDialog: false })
    this.props.fetchAndSelectSong(this.props.match.params.id)
  }

  toggleOptions = value => {
    this.setState({ showOptions: value })
  }

  play = () => {
    this.props.toggleControls(false)

    setTimeout(() => {
      this.startScroll()
    }, this.props.isPaused ? 0 : 2000)
  }

  handleScroll = () => {
    if (this.props.isPaused) {
      return
    }

    const amountToScroll = document.documentElement.scrollHeight - window.innerHeight
    this.scrollSpeed = amountToScroll / this.props.selectedSong.seconds

    const now = new Date()
    const msElapsedSinceStart = now.getTime() - this.startTime.getTime()
    const scrollAmount = msElapsedSinceStart / 1000 * this.scrollSpeed
    this.offset += scrollAmount

    window.scrollTo(0, this.offset)
    this.startTime = now

    const scrollIsAtBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1
    if (scrollIsAtBottom) {
      console.log('stop scrolling')
      this.props.toggleInterval(false)
      this.props.scrollComplete()

      setTimeout(() => {
        this.props.toggleControls(true)
      }, 500)
    } else {
      requestAnimationFrame(this.handleScroll)
    }
  }

  startScroll = () => {
    this.props.play()

    this.startTime = new Date()
    this.offset = window.scrollY

    requestAnimationFrame(this.handleScroll)
  }

  replay = () => {
    this.resetScroll()
    this.play()
  }

  resetScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  handleSongClick = () => {
    this.setState({ showOptions: false })
    this.props.toggleControls(!this.props.showControls)
  }

  render() {
    return (
      <Wrapper>
        {this.props.selectedSong ? (
          <Song
            song={this.props.selectedSong}
            clicked={this.handleSongClick}
            fontSize={this.props.selectedSong.fontSize}
          />
        ) : (
          <Grid container justify="center" alignItems="center">
            <CircularProgress size={50} />
          </Grid>
        )}

        <SongControls
          show={this.props.showControls}
          changeFontSize={this.props.changeFontSize}
          changeScrollSpeed={this.props.changeScrollSpeed}
          play={this.props.intervalRunning ? this.startScroll : this.play}
          pause={this.props.pause}
          replay={this.replay}
          isPaused={this.props.isPaused}
          isScrolling={this.props.isScrolling}
          showOptions={this.state.showOptions}
          toggleOptions={this.toggleOptions}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ song }) => ({
  selectedSong: song.selectedSong,
  showControls: song.showControls,
  isPaused: song.isPaused,
  isScrolling: song.isScrolling,
  intervalRunning: song.intervalRunning,
})

const mapDispatchToProps = dispatch => ({
  fetchAndSelectSong: songId => dispatch(actions.fetchAndSelectSong(songId)),
  play: () => dispatch(actions.play()),
  pause: () => dispatch(actions.pause()),
  changeFontSize: value => dispatch(actions.changeFontSize(value)),
  changeScrollSpeed: value => dispatch(actions.changeScrollSpeed(value)),
  toggleControls: value => dispatch(actions.toggleControls(value)),
  toggleInterval: value => dispatch(actions.toggleInterval(value)),
  scrollComplete: () => dispatch(actions.scrollComplete()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongContainer)
