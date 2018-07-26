import React from 'react'
import { renderTextField, renderCheckbox } from '../../../core/form-helpers'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import * as actions from '../../../actions'

class AddPlaylist extends React.Component {
  state = {}
  componentDidMount() {
    if (!this.props.songs.length) {
      console.log('fetch songs')
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('submit', this.props.addPlaylistFormValues)
    const songIds = []
    for (const key of Object.keys(this.props.addPlaylistFormValues)) {
      if (key.substring(0, 5) === 'song-') {
        songIds.push(key.substring(5))
      }
    }
    console.log(songIds)
    const playlist = { title: this.props.addPlaylistFormValues.title, songIds }
    this.props.addPlaylist(playlist, this.props.history)
  }

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

  render() {
    return (
      <div className="container align-center padding-24">
        <h1>Add Playlist</h1>

        <form onSubmit={this.handleSubmit}>
          <Grid container justify="space-between" alignItems="center" spacing={24}>
            <Grid item xs={12}>
              <Field component={renderTextField} name="title" label="Playlist name" fullWidth />
            </Grid>
            <Grid item xs={12}>
              {this.renderSongs()}
            </Grid>
            <Grid item xs={12}>
              <Button variant="flat" color="secondary" onClick={() => this.props.history.goBack()}>
                Cancel
              </Button>
              <Button variant="flat" color="primary" onClick={this.handleSubmit}>
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ form, song }) => ({
  songs: song.songs,
  addPlaylistFormValues: form.addPlaylistForm ? form.addPlaylistForm.values : {},
})

const mapDispatchToProps = dispatch => ({
  addPlaylist: (values, history) => dispatch(actions.addPlaylist(values, history)),
})

AddPlaylist = reduxForm({
  form: 'addPlaylistForm',
})(AddPlaylist)

AddPlaylist = connect(mapStateToProps, mapDispatchToProps)(AddPlaylist)

export default AddPlaylist
