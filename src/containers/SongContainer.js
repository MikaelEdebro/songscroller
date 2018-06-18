import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Song from 'components/Song/Song'
import SongControls from 'components/Song/SongControls'
import SongHeader from 'components/Song/SongHeader'
import Wrapper from 'hoc/Wrapper'
import * as songActions from 'store/actions'

const ScrollWrapper = styled.div`
  position: relative;
  height: ${props => (props.showControls ? 'calc(100vh - 50px)' : '100vh')};
  padding-top: ${props => (props.paddingTop ? '50px' : '0')};
  overflow-y: auto;
  overflow-x: visible;
  transition: all 0.5s ease-out;
`

class SongContainer extends React.Component {
  scrollInterval = null

  componentWillMount() {
    this.song = this.props.songs.find(s => s.title === this.props.selectedSong)
  }

  play = () => {
    this.props.toggleHeader(false)
    this.props.toggleControls(false)

    setTimeout(() => {
      this.startScroll()
    }, 2000)
  }

  startScroll = () => {
    this.props.play()

    const INTERVAL_TIME = 20
    const { seconds } = this.song
    const songDiv = ReactDOM.findDOMNode(this.songDiv)
    const songPosition = songDiv.getBoundingClientRect()
    const wrapperPosition = this.scrollWrapper.getBoundingClientRect()

    const totalPixelsToScroll = songPosition.height - wrapperPosition.height
    const pixelsToScrollPerSecond = totalPixelsToScroll / seconds
    const pixelsToScrollPerInterval = pixelsToScrollPerSecond / (1000 / INTERVAL_TIME)

    if (!this.props.intervalRunning) {
      this.props.toggleInterval(true)
      let scrollAmount = pixelsToScrollPerInterval

      this.scrollInterval = setInterval(() => {
        if (this.props.isPaused) {
          return
        }
        scrollAmount += pixelsToScrollPerInterval
        this.scrollWrapper.scrollTop = scrollAmount

        const shouldStopScrolling =
          parseInt(songDiv.getBoundingClientRect().bottom, 10) <=
          parseInt(this.scrollWrapper.getBoundingClientRect().bottom, 10)
        if (shouldStopScrolling) {
          clearInterval(this.scrollInterval)
          this.props.toggleInterval(false)
          this.props.scrollComplete()

          setTimeout(() => {
            //this.resetScroll()
            this.props.toggleControls(true)
            this.props.toggleHeader(true)
          }, 1000)
        }
      }, INTERVAL_TIME)
    }
  }

  replay = () => {
    clearInterval(this.scrollInterval)
    this.resetScroll()
    this.play()
  }

  resetScroll = () => {
    this.scrollWrapper.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  render() {
    return (
      <Wrapper>
        <SongHeader show={this.props.showSongHeader || this.props.isPaused} />

        <ScrollWrapper
          playStarted={this.props.playStarted}
          paddingTop={this.props.showSongHeader && !this.props.isPaused}
          showControls={this.props.showControls}
          style={{ fontSize: this.props.fontSize + 'px' }}
          innerRef={el => (this.scrollWrapper = el)}
        >
          <Song
            song={this.song}
            ref={el => (this.songDiv = el)}
            clicked={() => this.props.toggleControls(!this.props.showControls)}
          />
        </ScrollWrapper>
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

const mapStateToProps = state => ({
  songs: state.songs,
  selectedSong: state.selectedSong,
  playStarted: state.playStarted,
  fontSize: state.fontSize,
  showSongHeader: state.showSongHeader,
  showControls: state.showControls,
  isPaused: state.isPaused,
  isScrolling: state.isScrolling,
  intervalRunning: state.intervalRunning,
})

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(songActions.play()),
  pause: () => dispatch(songActions.pause()),
  changeFontSize: value => dispatch(songActions.changeFontSize(value)),
  toggleControls: value => dispatch(songActions.toggleControls(value)),
  toggleHeader: value => dispatch(songActions.toggleHeader(value)),
  toggleInterval: value => dispatch(songActions.toggleInterval(value)),
  scrollComplete: () => dispatch(songActions.scrollComplete()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongContainer)
