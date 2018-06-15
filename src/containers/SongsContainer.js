import React from 'react'
import { connect } from 'react-redux'

import * as songActions from 'store/actions'
import SongListItem from 'components/Song/SongListItem'

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
          <SongListItem
            key={song.title}
            artist={song.artist}
            title={song.title}
            clicked={() => this.goToSong(song.title)}
          />
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
