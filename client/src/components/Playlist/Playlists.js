import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import ListItem from '../core/ListItem'
import PlaylistMenu from './PlaylistMenu'
import AddButtonBig from '../core/AddButtonBig'

const styles = theme => {
  return {
    button: {
      margin: theme.spacing.unit,
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'linear-gradient(135.41deg, #B46DCF 8.4%, #651882 97.09%)',
    },
    playlistsWrapper: {
      paddingBottom: 70,
    },
  }
}

class Playlists extends React.Component {
  componentDidMount() {
    this.props.fetchPlaylists()
  }

  renderPlaylists = () => {
    return this.props.playlists.map(playlist => (
      <ListItem
        key={playlist._id}
        clicked={() => this.props.history.push('/playlists/' + playlist._id)}
        actionComponent={<PlaylistMenu playlist={playlist} />}
        marginBottom
      >
        {playlist.title}
      </ListItem>
    ))
  }

  render() {
    const { classes } = this.props
    const noPlaylistsAdded = !this.props.playlists.length

    return (
      <div className="container padding-12">
        <Typography variant="display3" gutterBottom>
          Playlists
        </Typography>
        <div className={classes.playlistsWrapper}>{this.renderPlaylists()}</div>

        {noPlaylistsAdded && (
          <AddButtonBig
            icon="playlist_play"
            description="You havn't added any playlists!"
            buttonText="Add playlist"
            clicked={() => this.props.history.push('/playlists/add')}
          />
        )}

        <Button
          variant="fab"
          color="secondary"
          aria-label="Add Playlist"
          title="Add Playlist"
          className={classes.button}
          onClick={() => this.props.history.push('/playlists/add')}
        >
          <AddIcon />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ playlist }) => ({
  playlists: playlist.playlists,
})

const mapDispatchToProps = dispatch => ({
  fetchPlaylists: () => dispatch(actions.fetchPlaylists()),
  clearSelectedPlaylist: () => dispatch(actions.clearSelectedPlaylist()),
})
Playlists = withStyles(styles)(Playlists)
Playlists = connect(mapStateToProps, mapDispatchToProps)(Playlists)

export default Playlists
