import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { renderTextField, renderCheckbox } from '../../../core/form-helpers'
import Button from '@material-ui/core/Button'
import * as actions from '../../../actions'
import songFields from './songFields'
import validate from './validateSong'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

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
  componentWillMount() {
    this.props.clearSelectedSong()
  }

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
                  fontFamily: this.props.addSongValues.useMonospaceFont ? 'Roboto Mono' : 'Roboto',
                  marginBottom: '20px',
                }
              : { marginBottom: '20px' }
          }
          fullWidth
        />
      )
    })
  }

  handleSubmit = () => {
    const newSong = {
      ...this.props.addSongValues,
      fontSizes: [{ fontSize: 15, viewportWidth: window.innerWidth }],
    }
    this.props.addSong(newSong, this.props.history)
  }

  handleCancel = () => {
    this.props.history.push('/songs')
  }

  render() {
    return (
      <div className="container" style={{ padding: '10px 15px' }}>
        <FormWrapper onSubmit={this.handleSubmit}>
          {this.renderFields()}

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
    useMonospaceFont: true,
  },
})

const mapDispatchToProps = dispatch => ({
  clearSelectedSong: () => dispatch(actions.clearSelectedSong()),
  addSong: (song, history) => dispatch(actions.addSong(song, history)),
})

const reduxFormConfig = {
  form: 'addSong',
  validate,
}
AddSong = reduxForm(reduxFormConfig)(AddSong)
AddSong = connect(mapStateToProps, mapDispatchToProps)(AddSong)

export default AddSong
