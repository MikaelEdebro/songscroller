import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import PlaylistSongs from './PlaylistSongs'
import ListItem from '../core/ListItem'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { randomString } from '../../core/utility'
import PlaylistAddSongsDialog from './PlaylistAddSongsDialog'
import Loader from '../Layout/Loader'
import PlaylistMenu from './PlaylistMenu'
import PlaylistAddSongsButton from './PlaylistAddSongsButton'

const styles = theme => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 26,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 40,
    },
  },
  icon: {
    color:
      theme.palette.type === 'light' ? theme.palette.text.secondary : theme.palette.text.primary,
  },
  buttonIcon: {
    marginRight: theme.spacing.unit,
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

  showAddSongDialog = async () => {
    this.setState({
      showAddSongsDialog: true,
    })
    if (!this.props.songs.length || this.props.shouldReFetchSongs) {
      await this.props.fetchSongs()
    }
    this.setState({
      songsToAdd: this.props.songs.filter(song =>
        removeAlreadyAddedSongs(song, this.props.selectedPlaylist.songs.map(s => s._id))
      ),
    })
  }

  hideAddSongsDialog = () => {
    this.setState({ showAddSongsDialog: false })
  }

  addSongToPlaylist = song => {
    const playlist = this.props.selectedPlaylist

    // the list of songs to add
    const songsToAdd = [...this.state.songsToAdd]
    const songIndex = songsToAdd.findIndex(s => s._id === song._id)
    songsToAdd.splice(songIndex, 1)

    // add new song to playlist
    const songs = [...playlist.songs]
    songs.push(song)
    const newPlaylist = { ...playlist, songs }
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
      <ListItem
        key={song._id}
        clicked={() => this.addSongToPlaylist(song)}
        actionComponent={<AddIcon song={song} />}
        marginBottom
      >
        {song.artist} - {song.title}
      </ListItem>
    ))
  }

  play = songId => {
    console.log('play ', songId)
  }

  render() {
    const { classes } = this.props

    if (!this.props.selectedPlaylist) {
      return <Loader text="Loading playlist" />
    }

    const { title, songs } = this.props.selectedPlaylist
    const hasSongs = songs.length > 0
    const ButtonContainer = () =>
      hasSongs && (
        <Grid container justify="space-between" style={{ margin: '12px 0' }}>
          <Button variant="flat" color="primary" onClick={this.play}>
            <Icon className={classes.buttonIcon}>play_arrow</Icon> Play
          </Button>
          <Button variant="flat" color="primary" onClick={this.showAddSongDialog}>
            Add songs
          </Button>
        </Grid>
      )

    return (
      <div className="container padding-12">
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="display3" className={classes.title}>
            {title}
          </Typography>
          <PlaylistMenu playlist={this.props.selectedPlaylist} />
        </Grid>
        <ButtonContainer />
        {this.props.selectedPlaylist && (
          <PlaylistSongs key={this.state.renderKey} playlist={this.props.selectedPlaylist} />
        )}
        <ButtonContainer />

        {!hasSongs && (
          <Grid container justify="center" style={{ marginTop: 40 }}>
            <PlaylistAddSongsButton clicked={this.showAddSongDialog} />
          </Grid>
        )}

        <PlaylistAddSongsDialog
          onClose={this.hideAddSongsDialog}
          open={this.state.showAddSongsDialog}
          showLoader={!this.props.songs.length || this.props.shouldReFetchSongs}
        >
          {this.renderSongsToAdd()}
        </PlaylistAddSongsDialog>
      </div>
    )
  }
}

const mapStateToProps = ({ song, playlist }) => ({
  songs: song.songs,
  shouldReFetchSongs: song.shouldReFetchSongs,
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
