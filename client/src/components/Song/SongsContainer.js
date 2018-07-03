import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'
import SongListItem from './SongListItem'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => {
  console.log('theme', theme)
  return {
    button: {
      margin: theme.spacing.unit,
      position: 'fixed',
      bottom: '20px',
      right: '20px',
    },
    container: {
      textAlign: 'center',
    },
    songsWrapper: {
      maxWidth: '400px',
      margin: '0 auto',
    },
  }
}

class SongsContainer extends React.Component {
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

  renderSongs() {
    if (!this.props.songs.length) {
      return null
    }
    return this.props.songs.map(song => (
      <SongListItem
        key={song._id}
        artist={song.artist}
        title={song.title}
        clicked={() => this.goToSong(song.title)}
      />
    ))
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <h1>Songs</h1>
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
