import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import SongListItem from '../Song/SongListItem'
import CircularProgress from '@material-ui/core/CircularProgress'

class Playlist extends React.Component {
  componentDidMount() {
    this.props.fetchAndSelectPlaylist(this.props.match.params.id)
  }

  renderPlaylistSongs = () => {
    if (!this.props.selectedPlaylist.songs.length) {
      return (
        <Button variant="flat" color="primary">
          Add songs to playlist
        </Button>
      )
    }
    return this.props.selectedPlaylist.songs.map(song => (
      <SongListItem key={song._id} song={song} clicked={() => {}} />
    ))
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
      </div>
    )
  }
}

const mapStateToProps = ({ song, playlist }) => ({
  selectedPlaylist: playlist.selectedPlaylist,
})

const mapDispatchToProps = dispatch => ({
  fetchAndSelectPlaylist: id => dispatch(actions.fetchAndSelectPlaylist(id)),
})

Playlist = connect(mapStateToProps, mapDispatchToProps)(Playlist)

export default Playlist
