import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Song from 'components/Song/Song'
import SongControls from 'components/Song/SongControls'
import Wrapper from 'hoc/Wrapper'
import * as songActions from 'store/actions'

const ScrollWrapper = styled.div`
  position: relative;
  height: ${props => (props.showControls ? 'calc(100vh - 50px)' : '100vh')};
  padding-top: ${props => (!props.playStarted ? '50px' : '0')};
  overflow-y: auto;
  overflow-x: visible;
  transition: all 0.5s ease-out;
`

class SongContainer extends React.Component {
  state = {
    fontSize: 15,
    showControls: true,
    isScrolling: false,
    isPaused: false,
    intervalRunning: false,
  }
  scrollInterval = null

  componentWillMount() {
    this.song = this.props.songs.find(s => s.title === this.props.selectedSong)
  }
  componentDidMount() {
    this.adjustFontSizeToViewport()
  }

  adjustFontSizeToViewport = () => {
    // todo: add implementation
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    let songWidth = ReactDOM.findDOMNode(this.songDiv).getBoundingClientRect().width

    console.log('adjust', viewportWidth, songWidth)
    if (songWidth <= viewportWidth) {
      return
    }
  }

  changeFontSize = value => {
    this.setState(prevState => ({ fontSize: prevState.fontSize + value }))
  }

  play = () => {
    this.props.play()
    this.toggleControls(false)

    setTimeout(() => {
      this.startScroll()
    }, 2000)
  }

  startScroll = () => {
    this.setState({ isPaused: false, isScrolling: true })

    const INTERVAL_TIME = 20
    const { seconds } = this.song
    const songDiv = ReactDOM.findDOMNode(this.songDiv)
    const songPosition = songDiv.getBoundingClientRect()
    const wrapperPosition = this.scrollWrapper.getBoundingClientRect()

    const totalPixelsToScroll = songPosition.height - wrapperPosition.height
    const pixelsToScrollPerSecond = totalPixelsToScroll / seconds
    const pixelsToScrollPerInterval = pixelsToScrollPerSecond / (1000 / INTERVAL_TIME)

    console.log({ totalPixelsToScroll, wrapperHeight: wrapperPosition.height })

    if (!this.state.intervalRunning) {
      this.setState({ intervalRunning: true })
      let scrollAmount = pixelsToScrollPerInterval

      this.scrollInterval = setInterval(() => {
        if (this.state.isPaused) {
          return
        }
        scrollAmount += pixelsToScrollPerInterval
        this.scrollWrapper.scrollTop = scrollAmount

        const shouldStopScrolling =
          parseInt(songDiv.getBoundingClientRect().bottom, 10) <=
          parseInt(this.scrollWrapper.getBoundingClientRect().bottom, 10)
        if (shouldStopScrolling) {
          clearInterval(this.scrollInterval)
          this.setState({
            isPaused: false,
            isScrolling: false,
            intervalRunning: false,
          })

          setTimeout(() => {
            this.resetScroll()
            this.toggleControls(true)
          }, 1000)
        }
      }, INTERVAL_TIME)
    }
  }
  pause = () => {
    this.props.pause()
    this.setState({ isPaused: true, isScrolling: false })
  }

  replay = () => {
    clearInterval(this.scrollInterval)
    this.setState({ isPaused: true, isScrolling: false, intervalRunning: false })
    this.resetScroll()
    this.play()
  }

  resetScroll = () => {
    this.scrollWrapper.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }

  toggleControls = value => {
    this.setState({ showControls: value })
  }

  render() {
    return (
      <Wrapper>
        <ScrollWrapper
          playStarted={this.props.playStarted}
          showControls={this.state.showControls}
          style={{ fontSize: this.state.fontSize + 'px' }}
          innerRef={el => (this.scrollWrapper = el)}
        >
          <Song
            song={this.song}
            ref={el => (this.songDiv = el)}
            clicked={() => this.toggleControls(!this.state.showControls)}
          />
        </ScrollWrapper>
        <SongControls
          show={this.state.showControls}
          increaseFont={() => this.changeFontSize(1)}
          decreaseFont={() => this.changeFontSize(-1)}
          play={this.state.intervalRunning ? this.startScroll : this.play}
          pause={this.pause}
          replay={this.replay}
          isPaused={this.state.isPaused}
          isScrolling={this.state.isScrolling}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  songs: state.songs,
  selectedSong: state.selectedSong,
  playStarted: state.playStarted,
})

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(songActions.play()),
  pause: () => dispatch(songActions.pause()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongContainer)
