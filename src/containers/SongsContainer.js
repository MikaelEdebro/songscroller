import React from 'react'
import { connect } from 'react-redux'

import * as songActions from 'store/actions'

class SongsContainer extends React.Component {
  state = {}

  goToSong = id => {
    this.props.selectSong(id)
    this.props.history.push('/songs/' + id)
  }

  render() {
    return (
      <div>
        <h1>Songs</h1>
        {this.props.songs.map(song => (
          <div key={song.title} onClick={() => this.goToSong(song.title)}>
            {song.artist} - {song.title}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  songs: state.songs,
})

const mapDispatchToProps = dispatch => ({
  selectSong: id => dispatch(songActions.selectSong(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongsContainer)
