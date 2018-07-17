import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import songFields from './songFields'
import validate from './validateSong'
import { renderTextField, renderCheckbox } from '../../../core/form-helpers'

class SongForm extends React.Component {
  renderFields() {
    return songFields.map(({ type, name, label, placeholder, multiline }) => {
      const renderMethod = type === 'checkbox' ? renderCheckbox : renderTextField
      return (
        <Field
          key={name}
          component={renderMethod}
          type="text"
          name={name}
          label={label}
          placeholder={placeholder}
          multiline={multiline}
          style={
            multiline
              ? {
                  fontFamily: this.props.songFormValues.useMonospaceFont ? 'Roboto Mono' : 'Roboto',
                  marginBottom: '20px',
                }
              : { marginBottom: '20px' }
          }
          fullWidth
        />
      )
    })
  }

  render() {
    return this.renderFields()
  }
}

const mapStateToProps = ({ form, song }) => ({
  songFormValues: form.songForm ? form.songForm.values : {},
  initialValues: {
    artist: song.selectedSong ? song.selectedSong.artist : '',
    title: song.selectedSong ? song.selectedSong.title : '',
    body: song.selectedSong ? song.selectedSong.body : '',
    useMonospaceFont: song.selectedSong ? song.selectedSong.useMonospaceFont : true,
  },
})

SongForm = reduxForm({
  form: 'songForm',
  enableReinitialize: true,
  validate,
})(SongForm)
SongForm = connect(mapStateToProps)(SongForm)

export default SongForm
