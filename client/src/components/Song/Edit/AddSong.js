import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { renderTextField, renderSlider } from '../../../core/form-helpers'
import Button from '@material-ui/core/Button'
import * as actions from '../../../actions'
import songFields from './songFields'
import validate from './validateSong'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const ButtonsWrapper = styled(Grid)`
  padding: 10px 10px 20px;
`

const FormWrapper = styled.form`
  textarea {
    font-family: 'Roboto Mono', monospace;
    letter-spacing: -1px;
    white-space: pre;
  }
`

class AddSong extends React.Component {
  renderFields() {
    return songFields.map(({ name, label, placeholder, multiline }) => (
      <Field
        key={name}
        component={renderTextField}
        type="text"
        name={name}
        label={label}
        placeholder={placeholder}
        multiline={multiline}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
    ))
  }

  handleSubmit = () => {
    console.log('submit', this.props.addSongValues)
    this.props.addSong(this.props.addSongValues, this.props.history)
  }

  handleCancel = () => {
    this.props.history.push('/songs')
  }

  render() {
    return (
      <div className="container" style={{ padding: '10px 15px' }}>
        <Typography variant="display3" align="center" gutterBottom>
          Add song
        </Typography>
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderFields()}

          <Field component={renderSlider} name="seconds" fullWidth label="Song length" max={400} />

          <ButtonsWrapper container justify="flex-end" spacing={24}>
            <Button variant="flat" color="secondary" onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </ButtonsWrapper>
        </FormWrapper>
      </div>
    )
  }
}

const mapStateToProps = ({ form }) => ({
  addSongValues: form.addSong ? form.addSong.values : {},
  initialValues: {
    artist: '',
    title: '',
    body: '',
    seconds: 120,
  },
})

const mapDispatchToProps = dispatch => ({
  addSong: (song, history) => dispatch(actions.addSong(song, history)),
})

const reduxFormConfig = {
  form: 'addSong',
  validate,
}
AddSong = reduxForm(reduxFormConfig)(AddSong)
AddSong = connect(mapStateToProps, mapDispatchToProps)(AddSong)

export default AddSong
