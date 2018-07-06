import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { renderTextField } from '../../../core/form-helpers'
import Button from '@material-ui/core/Button'
import * as actions from '../../../actions'
import songFields from './songFields'
import validate from './validateSong'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

const ButtonsWrapper = styled(Grid)`
  padding: 10px 10px 20px;
`

class EditSong extends React.Component {
  componentWillMount() {
    this.props.fetchSong(this.props.match.params.id)
  }

  renderFields() {
    return songFields.map(({ name, label, placeholder, multiline }) => (
      <Field
        key={name}
        type="text"
        name={name}
        component={renderTextField}
        label={label}
        placeholder={placeholder}
        multiline={multiline}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
    ))
  }

  handleSubmit = () => {
    console.log('submit', this.props)
    this.props.editSong(this.props.match.params.id, this.props.editSongValues, this.props.history)
  }

  handleCancel = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="container" style={{ padding: '10px 15px' }}>
        <form onSubmit={this.handleSubmit}>
          {this.renderFields()}

          <ButtonsWrapper container justify="flex-end" spacing={24}>
            <Button variant="flat" color="secondary" onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </ButtonsWrapper>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ form, song }) => ({
  editSongValues: form.editSong ? form.editSong.values : {},
  initialValues: {
    artist: song.currentSong.artist,
    title: song.currentSong.title,
    body: song.currentSong.body,
  },
})

const mapDispatchToProps = dispatch => ({
  fetchSong: songId => dispatch(actions.fetchSong(songId)),
  editSong: (songId, values, history) => dispatch(actions.editSong(songId, values, history)),
})

const reduxFormConfig = {
  form: 'editSong',
  enableReinitialize: true,
  validate,
}

EditSong = reduxForm(reduxFormConfig)(EditSong)
EditSong = connect(mapStateToProps, mapDispatchToProps)(EditSong)

export default EditSong
