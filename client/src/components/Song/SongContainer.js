import React from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import Song from './Song'
import SongControls from './SongControls'
import Wrapper from '../../hoc/Wrapper'
import * as actions from '../../actions'
import { getFontSize } from '../../core/song-helpers'
import Loader from '../Layout/Loader'

class SongContainer extends React.Component {
  startTime = null
  offset = 0
  scrollSpeed = null
  scrollReqPointer = null

  state = {
    showSettings: false,
    scrollSpeed: 0,
    viewportWidth: window.innerWidth,
  }

  componentDidMount() {
    this.props.fetchAndSelectSong(this.props.match.params.id)

    // todo: add debounce/throtlle
    window.addEventListener('resize', this.updateViewportWidth)

    setInterval(() => {
      if (this.props.shouldSaveUpdatedSong) {
        this.saveEditedSong(this.props.selectedSong)
      }
    }, 10000)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateViewportWidth)

    if (this.props.shouldSaveUpdatedSong) {
      this.saveEditedSong(this.props.selectedSong)
    }
  }

  saveEditedSong = song => {
    const { artist, title, body, fontSizes } = song
    this.props.editSong(song._id, {
      artist,
      title,
      body,
      fontSizes,
    })
  }

  updateViewportWidth = () => {
    this.setState({ viewportWidth: window.innerWidth })
  }

  toggleSettings = value => {
    this.setState({ showSettings: value })
  }

  play = () => {
    this.props.toggleControls(false)

    setTimeout(() => {
      this.startScroll()
    }, this.props.isPaused && !this.props.isInReplayTransition ? 0 : 2000)
  }

  handleScroll = () => {
    if (this.props.isPaused) {
      return
    }

    const amountToScroll = document.documentElement.scrollHeight - window.innerHeight
    this.scrollSpeed = amountToScroll / this.props.selectedSong.seconds
    if (this.scrollSpeed !== this.state.scrollSpeed) {
      this.setState({ scrollSpeed: this.scrollSpeed })
    }

    const now = new Date()
    const msElapsedSinceStart = now.getTime() - this.startTime.getTime()
    const scrollAmountPerSecond = msElapsedSinceStart / 1000 * this.scrollSpeed
    this.offset += scrollAmountPerSecond

    window.scrollTo(0, this.offset)
    this.startTime = now

    const scrollIsAtBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 1
    if (scrollIsAtBottom) {
      this.props.scrollComplete()

      setTimeout(() => {
        this.props.toggleControls(true)
      }, 500)
    } else {
      this.scrollReqPointer = requestAnimationFrame(this.handleScroll)
    }
  }

  startScroll = () => {
    this.props.play()

    this.startTime = new Date()
    this.offset = window.scrollY

    this.scrollReqPointer = requestAnimationFrame(this.handleScroll)
  }

  replay = () => {
    cancelAnimationFrame(this.scrollReqPointer)

    this.props.replay()
    this.resetScroll()

    // need setTimeout to let values update correctly, to prevent scroll starting directly
    setTimeout(() => {
      this.play()
    }, 0)
  }

  resetScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  handleSongClick = () => {
    this.setState({ showSettings: false })
    this.props.toggleControls(!this.props.showControls)
  }

  changeSongInPlaylist = number => {
    const playlistSongs = this.props.selectedPlaylist.songs
    const currentSongIndex = playlistSongs.findIndex(s => s._id === this.props.match.params.id)
    if (currentSongIndex < 0) {
      return
    }
    let nextSongIndex = currentSongIndex + number
    if (nextSongIndex >= playlistSongs.length) {
      nextSongIndex = 0
    }
    if (nextSongIndex < 0) {
      nextSongIndex = playlistSongs.length - 1
    }

    const nextSong = this.props.selectedPlaylist.songs[nextSongIndex]
    this.props.history.push(`/songs/${nextSong._id}?playlist=true`)
  }

  render() {
    const fontSize = getFontSize(this.props.selectedSong)
    return (
      <Wrapper>
        {this.props.selectedSong ? (
          <Song song={this.props.selectedSong} clicked={this.handleSongClick} fontSize={fontSize} />
        ) : (
          <Loader text="Loading Song" />
        )}

        <SongControls
          show={this.props.showControls}
          song={this.props.selectedSong || {}}
          fontSize={fontSize}
          changeFontSize={this.props.changeFontSize}
          changeScrollSpeed={this.props.changeScrollSpeed}
          transposeSong={this.props.transposeSong}
          play={this.props.isPaused ? this.startScroll : this.play}
          pause={this.props.pause}
          replay={this.replay}
          isPaused={this.props.isPaused}
          isScrolling={this.props.isScrolling}
          showSettings={this.state.showSettings}
          toggleSettings={this.toggleSettings}
          scrollSpeed={this.state.scrollSpeed}
          isPlaylistMode={qs.parse(document.location.search).playlist}
          nextSongInPlaylist={() => this.changeSongInPlaylist(1)}
          previousSongInPlaylist={() => this.changeSongInPlaylist(-1)}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ song, playlist }) => ({
  selectedSong: song.selectedSong,
  showControls: song.showControls,
  isPaused: song.isPaused,
  isScrolling: song.isScrolling,
  isInReplayTransition: song.isInReplayTransition,
  shouldSaveUpdatedSong: song.shouldSaveUpdatedSong,
  selectedPlaylist: playlist.selectedPlaylist,
})

const mapDispatchToProps = dispatch => ({
  fetchAndSelectSong: songId => dispatch(actions.fetchAndSelectSong(songId)),
  play: () => dispatch(actions.play()),
  pause: () => dispatch(actions.pause()),
  replay: () => dispatch(actions.replay()),
  changeFontSize: value => dispatch(actions.changeFontSize(value)),
  changeScrollSpeed: value => dispatch(actions.changeScrollSpeed(value)),
  transposeSong: value => dispatch(actions.transposeSong(value)),
  toggleControls: value => dispatch(actions.toggleControls(value)),
  scrollComplete: () => dispatch(actions.scrollComplete()),
  editSong: (songId, values) => dispatch(actions.editSong(songId, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongContainer)
