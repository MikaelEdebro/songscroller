import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'
import ListItem from '../core/ListItem'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import SearchSongs from './SearchSongs'
import SongMenu from './SongMenu'
import sortBy from 'lodash/sortBy'
import Loader from '../Layout/Loader'
import Typography from '@material-ui/core/Typography'
import AddButtonBig from '../core/AddButtonBig'

const styles = theme => {
  return {
    button: {
      margin: theme.spacing.unit,
      position: 'fixed',
      bottom: 10,
      right: 10,
    },
    songsWrapper: {
      paddingBottom: 70,
    },
  }
}

class SongsContainer extends React.Component {
  state = {
    query: '',
  }

  componentDidMount() {
    this.props.setIsFetchingSongs()
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
      <ListItem
        key={song._id}
        clicked={() => this.goToRoute('/songs/' + song._id)}
        actionComponent={<SongMenu song={song} />}
        marginBottom
      >
        {song.artist} - {song.title}
      </ListItem>
    ))
  }

  render() {
    const { classes } = this.props
    const noSongsAdded = !this.props.songs.length && !this.props.isFetchingSongs

    return (
      <div className="container padding-12">
        <Grid container justify="space-between">
          <Grid item xs={6} sm={6}>
            <Typography variant="display2" gutterBottom>
              Songs
            </Typography>
          </Grid>
          <Grid item align="right" xs={6} sm={6}>
            <SearchSongs query={this.state.query} onChange={this.handleQueryChange} />
          </Grid>
        </Grid>
        <div className={classes.songsWrapper}>
          {this.props.isFetchingSongs ? <Loader text="Loading Songs" /> : this.renderSongs()}
        </div>

        {noSongsAdded && (
          <AddButtonBig
            icon="queue_music"
            description="You havn't added any songs!"
            buttonText="Add song"
            clicked={() => this.goToRoute('/songs/add')}
          />
        )}

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
  isFetchingSongs: song.isFetchingSongs,
})

const mapDispatchToProps = dispatch => ({
  setIsFetchingSongs: () => dispatch(actions.setIsFetchingSongs()),
  clearSelectedSong: () => dispatch(actions.clearSelectedSong()),
  fetchSongs: () => dispatch(actions.fetchSongs()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SongsContainer))
