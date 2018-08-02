import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import PlaylistSongs from './PlaylistSongs'
import SongListItem from '../Song/SongListItem'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { randomString } from '../../core/utility'
import PlaylistAddSongsDialog from './PlaylistAddSongsDialog'
import Loader from '../Layout/Loader'

const styles = theme => ({
  icon: {
    color:
      theme.palette.type === 'light' ? theme.palette.text.secondary : theme.palette.text.primary,
  },
})

const removeAlreadyAddedSongs = (song, alreadyAddedSongs) => {
  return !alreadyAddedSongs.includes(song._id)
}

class Playlist extends React.Component {
  state = {
    showAddSongsDialog: false,
    renderKey: randomString(5),
    songsToAdd: [],
  }

  componentWillMount() {
    this.props.clearSelectedPlaylist()
    this.props.fetchAndSelectPlaylist(this.props.match.params.id)
  }

  componentDidMount() {
    setInterval(this.checkForPendingChanges, 10000)
  }

  componentWillUnmount() {
    if (this.props.pendingChanges) {
      this.props.savePlaylistDb(this.props.selectedPlaylist)
    }
    clearInterval(this.checkForPendingChanges)
  }

  checkForPendingChanges = () => {
    if (this.props.pendingChanges) {
      this.props.savePlaylistDb(this.props.selectedPlaylist)
    }
  }

  showAddSongDialog = () => {
    this.setState({
      showAddSongsDialog: true,
      songsToAdd: this.props.songs.filter(song =>
        removeAlreadyAddedSongs(song, this.props.selectedPlaylist.songIds)
      ),
    })
  }

  hideAddSongsDialog = () => {
    this.setState({ showAddSongsDialog: false })
  }

  addSongToPlaylist = songId => {
    const playlist = this.props.selectedPlaylist
    const songIds = [...playlist.songIds]
    songIds.push(songId)

    // the list of songs to add
    const songsToAdd = [...this.state.songsToAdd]
    const songIndex = songsToAdd.findIndex(s => s._id === songId)
    songsToAdd.splice(songIndex, 1)

    // add new song to playlist
    const songs = [...playlist.songs]
    const songToAdd = this.props.songs.find(s => s._id === songId)
    songs.push(songToAdd)
    const newPlaylist = { ...playlist, songIds, songs }
    this.props.savePlaylistLocal(newPlaylist)

    this.setState({ renderKey: randomString(5), songsToAdd })
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

    return this.state.songsToAdd.map(song => (
      <SongListItem
        key={song._id}
        song={song}
        clicked={() => this.addSongToPlaylist(song._id)}
        actionComponent={<AddIcon songId={song._id} />}
        style={{ marginBottom: 12 }}
      >
        {song.artist} - {song.title}
      </SongListItem>
    ))
  }

  render() {
    if (!this.props.selectedPlaylist) {
      return <Loader text="Loading playlist" />
    }

    const { title } = this.props.selectedPlaylist
    return (
      <div className="container padding-12 align-center">
        <Typography variant="display3" align="center">
          {title}
        </Typography>
        <div className="container-narrow">
          {this.props.selectedPlaylist.songIds.length > 8 && (
            <Button variant="flat" color="primary" onClick={this.showAddSongDialog}>
              Add songs
            </Button>
          )}
          {this.props.selectedPlaylist && (
            <PlaylistSongs key={this.state.renderKey} playlist={this.props.selectedPlaylist} />
          )}
          <Button variant="flat" color="primary" onClick={this.showAddSongDialog}>
            Add songs
          </Button>

          <PlaylistAddSongsDialog
            onClose={this.hideAddSongsDialog}
            open={this.state.showAddSongsDialog}
          >
            {this.renderSongsToAdd()}
          </PlaylistAddSongsDialog>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ song, playlist }) => ({
  songs: song.songs,
  selectedPlaylist: playlist.selectedPlaylist,
  pendingChanges: playlist.pendingChanges,
})

const mapDispatchToProps = dispatch => ({
  fetchSongs: () => dispatch(actions.fetchSongs()),
  fetchAndSelectPlaylist: id => dispatch(actions.fetchAndSelectPlaylist(id)),
  clearSelectedPlaylist: () => dispatch(actions.clearSelectedPlaylist()),
  savePlaylistDb: playlist => dispatch(actions.savePlaylistDb(playlist)),
  savePlaylistLocal: playlist => dispatch(actions.savePlaylistLocal(playlist)),
})

Playlist = connect(mapStateToProps, mapDispatchToProps)(Playlist)
Playlist = withStyles(styles)(Playlist)

export default Playlist
