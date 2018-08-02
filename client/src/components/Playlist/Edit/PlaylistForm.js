import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { renderTextField } from '../../../core/form-helpers'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import * as actions from '../../../actions'

class PlaylistForm extends React.Component {
  handleSubmit = event => {
    event.preventDefault()
    console.log('submit', this.props.playlistFormValues)

    const playlistId = this.props.match.params.id
    const playlist = {
      title: this.props.playlistFormValues.title,
    }

    if (this.props.edit) {
      this.props.savePlaylistDb(playlistId, playlist, this.props.history)
    } else {
      this.props.addPlaylist(playlist, this.props.history)
    }
  }

  handleCancel = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container justify="space-between" alignItems="center" spacing={24}>
          <Grid item xs={12}>
            <Field component={renderTextField} name="title" label="Playlist name" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button variant="flat" color="secondary" onClick={this.props.onCancel}>
              Cancel
            </Button>
            <Button variant="flat" color="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const mapStateToProps = ({ form, song, playlist }) => ({
  selectedPlaylist: playlist.selectedPlaylist,
  songs: song.songs,
  playlistFormValues: form.playlistForm ? form.playlistForm.values : {},
})

const mapDispatchToProps = dispatch => ({
  addPlaylist: (values, history) => dispatch(actions.addPlaylist(values, history)),
  savePlaylistDb: (playlist, history) => dispatch(actions.savePlaylistDb(playlist, history)),
})

PlaylistForm = reduxForm({
  form: 'playlistForm',
  enableReinitialize: true,
})(PlaylistForm)
PlaylistForm = connect(mapStateToProps, mapDispatchToProps)(PlaylistForm)
PlaylistForm = withRouter(PlaylistForm)

export default PlaylistForm
