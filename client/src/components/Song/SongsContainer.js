import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'
import SongListItem from './SongListItem'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import SearchSongs from './SearchSongs'
//import debounce from 'lodash/debounce'

const styles = theme => {
  return {
    container: {
      padding: '10px',
    },
    button: {
      margin: theme.spacing.unit,
      position: 'fixed',
      bottom: '20px',
      right: '20px',
    },
    songsWrapper: {
      maxWidth: '500px',
      margin: '0 auto',
    },
  }
}

class SongsContainer extends React.Component {
  state = {
    query: '',
  }

  componentDidMount() {
    this.props.fetchSongs()
  }

  goToSong = id => {
    this.props.selectSong(id)
    this.props.history.push('/songs/' + id)
  }

  addSong = () => {
    this.props.history.push('/songs/new')
  }

  getFilteredSongs = () => {
    if (!this.state.query.length) {
      return this.props.songs
    }
    const query = this.state.query.toLowerCase()
    return this.props.songs.filter(
      song =>
        song.artist.toLowerCase().indexOf(query) !== -1 ||
        song.title.toLowerCase().indexOf(query) !== -1
    )
  }

  handleQueryChange = value => {
    this.setState({ query: value })
  }

  renderSongs() {
    const songs = this.getFilteredSongs()
    if (!songs.length) {
      return null
    }
    return songs.map(song => (
      <SongListItem key={song._id} song={song} clicked={() => this.goToSong(song._id)} />
    ))
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Typography variant="display2" gutterBottom align="center">
          Songs
        </Typography>
        <SearchSongs query={this.state.query} onChange={this.handleQueryChange} />
        <div className={classes.songsWrapper}>{this.renderSongs()}</div>
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          className={classes.button}
          onClick={this.addSong}
        >
          <AddIcon />
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SongsContainer))