import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import PlaylistForm from './PlaylistForm'

class AddPlaylist extends React.Component {
  componentDidMount() {
    if (!this.props.songs.length) {
      this.props.fetchSongs()
    }
  }

  render() {
    return (
      <div className="container padding-24">
        <h1 className="align-center">Edit Playlist</h1>
        <PlaylistForm edit />
      </div>
    )
  }
}

const mapStateToProps = ({ form, song }) => ({
  songs: song.songs,
})

const mapDispatchToProps = dispatch => ({
  fetchSongs: () => dispatch(actions.fetchSongs()),
})

AddPlaylist = connect(mapStateToProps, mapDispatchToProps)(AddPlaylist)

export default AddPlaylist
