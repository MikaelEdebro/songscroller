import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import PlaylistSongs from './PlaylistSongs'
import SongListItem from '../Song/SongListItem'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { randomString } from '../../core/utility'

const styles = theme => ({
  icon: {
    color:
      theme.palette.type === 'light' ? theme.palette.text.secondary : theme.palette.text.primary,
  },
})

class Playlist extends React.Component {
  state = {
    isEditMode: false,
    renderKey: randomString(5),
  }

  componentWillMount() {
    this.props.clearSelectedPlaylist()
    this.props.fetchAndSelectPlaylist(this.props.match.params.id)
  }

  toggleIsEditMode = () => {
    this.setState(prevState => ({ isEditMode: !prevState.isEditMode }))
  }

  addSongToPlaylist = songId => {
    const playlist = this.props.selectedPlaylist
    const songIds = [...playlist.songIds]
    songIds.push(songId)
    const newPlaylistValues = { title: playlist.title, songIds }
    this.props.editPlaylist(playlist._id, newPlaylistValues)
    this.setState({ renderKey: randomString(5) })
  }

  renderSongsToAdd = () => {
    const AddIcon = props => (
      <IconButton
        color="inherit"
        onClick={() => this.addSongToPlaylist(props.songId)}
        title="Add song to playlist"
      >
        <Icon className={this.props.classes.icon}>add</Icon>
      </IconButton>
    )

    const removeAlreadyAddedSongs = (song, alreadyAddedSongs) => {
      return !alreadyAddedSongs.includes(song._id)
    }

    const alreadyAddedSongs = this.props.selectedPlaylist.songIds
    return this.props.songs
      .filter(song => removeAlreadyAddedSongs(song, alreadyAddedSongs))
      .map(song => (
        <SongListItem
          key={song._id}
          song={song}
          clicked={() => {}}
          actionComponent={<AddIcon songId={song._id} />}
          style={{ marginBottom: 12 }}
        >
          {song.artist} - {song.title}
        </SongListItem>
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
        <div className="container-narrow">
          {this.props.selectedPlaylist.songIds.length > 8 && (
            <Button variant="flat" color="primary" onClick={this.toggleIsEditMode}>
              Add songs
            </Button>
          )}
          {this.props.selectedPlaylist && (
            <PlaylistSongs
              key={this.state.renderKey}
              playlist={this.props.selectedPlaylist}
              isEditMode={this.state.isEditMode}
            />
          )}
          <Button variant="flat" color="primary" onClick={this.toggleIsEditMode}>
            {this.state.isEditMode ? 'Hide songs' : 'Add songs'}
          </Button>

          {this.state.isEditMode ? this.renderSongsToAdd() : null}
        </div>
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
  clearSelectedPlaylist: () => dispatch(actions.clearSelectedPlaylist()),
  editPlaylist: (playlistId, values) => dispatch(actions.editPlaylist(playlistId, values)),
})

Playlist = connect(mapStateToProps, mapDispatchToProps)(Playlist)
Playlist = withStyles(styles)(Playlist)
export default Playlist
