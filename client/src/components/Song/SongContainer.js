import React from 'react'
import { connect } from 'react-redux'

import Song from './Song'
import SongControls from './SongControls'
import Wrapper from '../../hoc/Wrapper'
import * as actions from '../../actions'

class SongContainer extends React.Component {
  scrollInterval = null
  startTime = null
  offset = 0
  scrollSpeed = null

  componentDidMount() {
    this.props.fetchSong(this.props.match.params.id)
    this.props.toggleControls(true)
  }

  play = () => {
    console.log('play')

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
    //this.offset = window.scrollY
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
    console.log('startScroll')
    this.props.play()

    this.startTime = new Date()
    const amountToScroll = document.documentElement.scrollHeight - window.innerHeight
    this.scrollSpeed = amountToScroll / this.props.currentSong.seconds
    this.offset = window.scrollY

    requestAnimationFrame(this.handleScroll)
  }

  replay = () => {
    console.log('replay')

    this.resetScroll()
    this.play()
  }

  resetScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  render() {
    return (
      <Wrapper>
        <Song
          song={this.props.currentSong}
          clicked={() => this.props.toggleControls(!this.props.showControls)}
          fontSize={this.props.currentSong.fontSize}
        />

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
  songs: song.songs,
  currentSong: song.currentSong,
  playStarted: song.playStarted,
  showControls: song.showControls,
  isPaused: song.isPaused,
  isScrolling: song.isScrolling,
  intervalRunning: song.intervalRunning,
})

const mapDispatchToProps = dispatch => ({
  fetchSong: songId => dispatch(actions.fetchSong(songId)),
  play: () => dispatch(actions.play()),
  pause: () => dispatch(actions.pause()),
  changeFontSize: value => dispatch(actions.changeFontSize(value)),
  toggleControls: value => dispatch(actions.toggleControls(value)),
  toggleInterval: value => dispatch(actions.toggleInterval(value)),
  scrollComplete: () => dispatch(actions.scrollComplete()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongContainer)
