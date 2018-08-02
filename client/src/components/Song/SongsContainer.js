import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'
import SongListItem from './SongListItem'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import SearchSongs from './SearchSongs'
import SongMenu from './SongMenu'
import sortBy from 'lodash/sortBy'
import Loader from '../Layout/Loader'

const styles = theme => {
  return {
    button: {
      margin: theme.spacing.unit,
      position: 'fixed',
      bottom: '10px',
      right: '10px',
    },
    songsWrapper: {
      maxWidth: '500px',
      margin: '0 auto',
      paddingBottom: '70px',
    },
  }
}

class SongsContainer extends React.Component {
  state = {
    query: '',
  }

  componentDidMount() {
    this.props.clearSelectedSong()
    this.props.fetchSongs()
  }

  goToRoute = route => {
    this.props.history.push(route)
  }

  getFilteredSongs = () => {
    if (!this.state.query.length) {
      return sortBy(this.props.songs, ['artist', 'title'])
    }
    const query = this.state.query.toLowerCase()
    return sortBy(
      this.props.songs.filter(
        song =>
          song.artist.toLowerCase().indexOf(query) !== -1 ||
          song.title.toLowerCase().indexOf(query) !== -1
      ),
      ['artist', 'title']
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
      <SongListItem
        key={song._id}
        song={song}
        clicked={() => this.goToRoute('/songs/' + song._id)}
        actionComponent={<SongMenu song={song} />}
        align="left"
        style={{ marginBottom: '10px' }}
      >
        {song.artist} - {song.title}
      </SongListItem>
    ))
  }

  render() {
    if (!this.props.songs.length) {
      return <Loader text="Loading Songs" />
    }

    const { classes } = this.props
    return (
      <div className="container padding-12">
        <SearchSongs query={this.state.query} onChange={this.handleQueryChange} />
        <div className={classes.songsWrapper}>{this.renderSongs()}</div>
        <Button
          variant="fab"
          color="secondary"
          aria-label="Add Song"
          title="Add Song"
          className={classes.button}
          onClick={() => this.goToRoute('/songs/add')}
        >
          <AddIcon />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ song }) => ({
  songs: song.songs,
})

const mapDispatchToProps = dispatch => ({
  clearSelectedSong: () => dispatch(actions.clearSelectedSong()),
  fetchSongs: () => dispatch(actions.fetchSongs()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SongsContainer))
