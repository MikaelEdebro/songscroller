import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import SongListItem from '../Song/SongListItem'

class Playlist extends React.Component {
  componentDidMount() {
    this.props.fetchAndSelectPlaylist(this.props.match.params.id)
  }

  renderPlaylistSongs = () => {
    return this.props.selectedPlaylist.songs.map(song => (
      <SongListItem key={song._id} song={song} clicked={() => {}} />
    ))
  }

  editPlaylist = () => {
    this.props.history.push('/playlists/edit/' + this.props.match.params.id)
  }

  render() {
    if (!this.props.selectedPlaylist) {
      return (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      )
    }

    const { title } = this.props.selectedPlaylist
    return (
      <div className="container padding-12 align-center">
        <Typography variant="display3" align="center">
          {title}
        </Typography>
        <div className="container-narrow">{this.renderPlaylistSongs()}</div>

        <Button variant="flat" color="primary" onClick={this.editPlaylist}>
          Edit playlist
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ song, playlist }) => ({
  songs: song.songs,
  selectedPlaylist: playlist.selectedPlaylist,
})

const mapDispatchToProps = dispatch => ({
  fetchSongs: () => dispatch(actions.fetchSongs()),
  fetchAndSelectPlaylist: id => dispatch(actions.fetchAndSelectPlaylist(id)),
})

Playlist = connect(mapStateToProps, mapDispatchToProps)(Playlist)

export default Playlist
