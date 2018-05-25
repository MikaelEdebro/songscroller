import React from 'react'
import ReactDOM from 'react-dom'

import Song from 'components/Song/Song'
import SongControls from 'components/Song/SongControls'
import Wrapper from 'hoc/Wrapper'
import './SongContainer.css'

class SongContainer extends React.Component {
  state = {
    fontSize: 15,
    showControls: true,
    isScrolling: false,
    isPaused: false,
    intervalStarted: false,
  }

  decreaseFont = () => {
    this.setState(prevState => ({ fontSize: prevState.fontSize - 1 }))
  }

  increaseFont = () => {
    this.setState(prevState => ({
      fontSize: prevState.fontSize + 1,
    }))
  }

  play = () => {
    this.toggleControls(false)
    this.setState({ isPaused: false, isScrolling: true })

    const INTERVAL_TIME = 10
    const { seconds } = this.props.song
    const songDiv = ReactDOM.findDOMNode(this.songDiv)
    const songPosition = songDiv.getBoundingClientRect()
    const wrapperPosition = this.scrollWrapper.getBoundingClientRect()

    const totalPixelsToScroll = songPosition.height - wrapperPosition.height
    const pixelsToScrollPerSecond = totalPixelsToScroll / seconds
    const pixelsToScrollPerInterval = pixelsToScrollPerSecond / (1000 / INTERVAL_TIME)

    console.log({
      totalPixelsToScroll,
      pixelsToScrollPerSecond,
      pixelsToScrollPerInterval,
    })

    if (!this.state.intervalStarted) {
      this.setState({ intervalStarted: true })
      let scrollAmount = pixelsToScrollPerInterval
      const scrollInterval = setInterval(() => {
        if (this.state.isPaused) {
          return
        }
        scrollAmount += pixelsToScrollPerInterval
        this.scrollWrapper.scrollTop = scrollAmount

        const shouldStopScrolling =
          parseInt(songDiv.getBoundingClientRect().bottom, 10) <=
          parseInt(this.scrollWrapper.getBoundingClientRect().bottom, 10)
        if (shouldStopScrolling) {
          clearInterval(scrollInterval)
          this.setState({ isPaused: false, isScrolling: false })
        }
      }, INTERVAL_TIME)
    }
  }

  pause = () => {
    this.setState({ isPaused: true, isScrolling: false })
  }

  resetScroll = () => {
    this.scrollWrapper.scrollTop = 0
  }

  toggleControls = value => {
    this.setState({ showControls: value })
  }

  render() {
    return (
      <Wrapper>
        <div
          className={['scroll-panel', !this.state.showControls ? 'full-height' : null].join(' ')}
          style={{ fontSize: this.state.fontSize + 'px' }}
          ref={el => (this.scrollWrapper = el)}
        >
          <Song
            song={this.props.song}
            ref={el => (this.songDiv = el)}
            clicked={() => this.toggleControls(!this.state.showControls)}
          />
        </div>
        <SongControls
          show={this.state.showControls}
          increaseFont={this.increaseFont}
          decreaseFont={this.decreaseFont}
          play={this.play}
          pause={this.pause}
          isPaused={this.state.isPaused}
          isScrolling={this.state.isScrolling}
        />
      </Wrapper>
    )
  }
}

export default SongContainer
