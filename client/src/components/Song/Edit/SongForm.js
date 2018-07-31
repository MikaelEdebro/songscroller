import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import songFields from './songFields'
import validate from './validateSong'
import { renderTextField, renderCheckbox } from '../../../core/form-helpers'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { getFontSize } from '../../../core/song-helpers'

class SongForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }
  state = {
    formSubmitted: false,
  }

  getRenderMethod = type => {
    switch (type) {
      case 'checkbox':
        return renderCheckbox
      default:
        return renderTextField
    }
  }

  handleSubmit = () => {
    this.setState({ formSubmitted: true })
    this.props.onSubmit()
  }

  renderFields() {
    return songFields.map(({ type, name, label, placeholder, multiline, widths }) => {
      return (
        <Grid item {...widths} key={name}>
          <Field
            component={this.getRenderMethod(type)}
            type="text"
            name={name}
            label={label}
            placeholder={placeholder}
            multiline={multiline}
            formSubmitted={this.state.formSubmitted}
            style={
              multiline
                ? {
                    fontFamily: this.props.songFormValues.useMonospaceFont
                      ? 'Roboto Mono'
                      : 'Roboto',
                    whiteSpace: 'nowrap',
                    fontSize: getFontSize(this.props.selectedSong) + 'px',
                  }
                : null
            }
            fullWidth
          />
          {this.props.children}
        </Grid>
      )
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="container" style={{ padding: '10px' }}>
        <Grid container justify="space-between" alignItems="center" spacing={24}>
          {this.renderFields()}

          <Grid item align="right" xs={12} sm={6}>
            <Button variant="flat" color="secondary" onClick={this.props.onCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

const mapStateToProps = ({ form, song }) => ({
  selectedSong: song.selectedSong,
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
