import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { renderTextField, renderCheckbox } from '../../../core/form-helpers'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import * as actions from '../../../actions'

class PlaylistForm extends React.Component {
  renderSongs = () => {
    const songs = this.props.songs.map(s => (
      <Field
        key={s._id}
        component={renderCheckbox}
        name={'song-' + s._id}
        label={s.artist + ' - ' + s.title}
      />
    ))

    return <FormGroup>{songs}</FormGroup>
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('submit', this.props.playlistFormValues)
    const songIds = []
    for (const key of Object.keys(this.props.playlistFormValues)) {
      if (this.props.playlistFormValues[key] && key.substring(0, 5) === 'song-') {
        songIds.push(key.substring(5))
      }
    }
    const playlistId = this.props.match.params.id
    const playlist = {
      title: this.props.playlistFormValues.title,
      songIds,
    }

    if (this.props.edit) {
      this.props.editPlaylist(playlistId, playlist, this.props.history)
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
            {this.renderSongs()}
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

function getInitialValues(playlist) {
  if (!playlist) {
    return null
  }
  let initialValues = {
    title: playlist.title,
  }
  playlist.songIds.forEach(songId => {
    initialValues['song-' + songId] = true
  })

  return initialValues
}

const mapStateToProps = ({ form, song, playlist }) => ({
  selectedPlaylist: playlist.selectedPlaylist,
  songs: song.songs,
  playlistFormValues: form.playlistForm ? form.playlistForm.values : {},
  initialValues: getInitialValues(playlist.selectedPlaylist),
})

const mapDispatchToProps = dispatch => ({
  addPlaylist: (values, history) => dispatch(actions.addPlaylist(values, history)),
  editPlaylist: (playlistId, values, history) =>
    dispatch(actions.editPlaylist(playlistId, values, history)),
})

PlaylistForm = reduxForm({
  form: 'playlistForm',
  enableReinitialize: true,
})(PlaylistForm)
PlaylistForm = connect(mapStateToProps, mapDispatchToProps)(PlaylistForm)
PlaylistForm = withRouter(PlaylistForm)

export default PlaylistForm
