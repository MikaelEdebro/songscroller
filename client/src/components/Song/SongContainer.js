import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Song from './Song'
import SongControls from './SongControls'
import SongHeader from './SongHeader'
import EditSong from './Edit/EditSong'
import Wrapper from '../../hoc/Wrapper'
import * as actions from '../../actions'

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

  componentDidMount() {
    console.log('SongContainer')
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

            setTimeout(() => {
              this.scrollToBottom()
            }, 1000)
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

  scrollToBottom = () => {
    this.scrollWrapper.scroll({
      top: 2000, // todo: replace hard coded value
      behavior: 'smooth',
    })
  }

  render() {
    let song = (
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
    )

    if (this.props.isEditMode) {
      song = <EditSong song={this.song} />
    }

    return (
      <Wrapper>
        <SongHeader show={this.props.showSongHeader || this.props.isPaused} />

        {song}
        <SongControls
          show={this.props.showControls && !this.props.isEditMode}
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
  selectedSong: song.selectedSong,
  playStarted: song.playStarted,
  fontSize: song.fontSize,
  showSongHeader: song.showSongHeader,
  showControls: song.showControls,
  isPaused: song.isPaused,
  isScrolling: song.isScrolling,
  intervalRunning: song.intervalRunning,
  isEditMode: song.isEditMode,
})

const mapDispatchToProps = dispatch => ({
  play: () => dispatch(actions.play()),
  pause: () => dispatch(actions.pause()),
  changeFontSize: value => dispatch(actions.changeFontSize(value)),
  toggleControls: value => dispatch(actions.toggleControls(value)),
  toggleHeader: value => dispatch(actions.toggleHeader(value)),
  toggleInterval: value => dispatch(actions.toggleInterval(value)),
  scrollComplete: () => dispatch(actions.scrollComplete()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongContainer)
