import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'
import SongListItem from './SongListItem'

class SongsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchSongs()
    console.log('SongsContainer')
  }

  goToSong = id => {
    this.props.selectSong(id)
    this.props.history.push('/songs/' + id)
  }

  renderSongs() {
    if (!this.props.songs.length) {
      return null
    }
    return this.props.songs.map(song => (
      <SongListItem
        key={song.title}
        artist={song.artist}
        title={song.title}
        clicked={() => this.goToSong(song.title)}
      />
    ))
  }

  render() {
    return (
      <div>
        <h1>Songs</h1>
        {this.renderSongs()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  songs: state.song.songs,
})

const mapDispatchToProps = dispatch => ({
  fetchSongs: () => dispatch(actions.fetchSongs()),
  selectSong: id => dispatch(actions.selectSong(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongsContainer)
