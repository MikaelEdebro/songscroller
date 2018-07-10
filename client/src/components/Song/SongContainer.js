import React from 'react'
import { connect } from 'react-redux'

import Song from './Song'
import SongControls from './SongControls'
import Wrapper from '../../hoc/Wrapper'
import * as actions from '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress'

class SongContainer extends React.Component {
  startTime = null
  offset = 0
  scrollSpeed = null

  componentDidMount() {
    this.props.fetchAndSelectSong(this.props.match.params.id)
  }

  play = () => {
    this.props.toggleControls(false)

    setTimeout(() => {
      this.startScroll()
    }, 2000)
  }

  handleScroll = () => {
    if (this.props.isPaused) {
      return
    }

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
    const amountToScroll = document.documentElement.scrollHeight - window.innerHeight
    this.scrollSpeed = amountToScroll / this.props.selectedSong.seconds
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

  render() {
    return (
      <Wrapper>
        {this.props.selectedSong ? (
          <Song
            song={this.props.selectedSong}
            clicked={() => this.props.toggleControls(!this.props.showControls)}
            fontSize={this.props.selectedSong.fontSize}
          />
        ) : (
          <CircularProgress size={50} />
        )}

        <SongControls
          show={this.props.showControls}
          increaseFont={() => this.props.changeFontSize(1)}
          decreaseFont={() => this.props.changeFontSize(-1)}
          play={this.props.intervalRunning ? this.startScroll : this.play}
          pause={this.props.pause}
          replay={this.replay}
          isPaused={this.props.isPaused}
          isScrolling={this.props.isScrolling}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ song }) => ({
  selectedSong: song.selectedSong,
  playStarted: song.playStarted,
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
  toggleControls: value => dispatch(actions.toggleControls(value)),
  toggleInterval: value => dispatch(actions.toggleInterval(value)),
  scrollComplete: () => dispatch(actions.scrollComplete()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongContainer)
