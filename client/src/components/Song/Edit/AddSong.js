import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { renderTextField } from '../../../core/form-helpers'
import Button from '@material-ui/core/Button'
import * as actions from '../../../actions'

const FIELDS = [
  { name: 'artist', label: 'Artist' },
  { name: 'title', label: 'Title' },
  { name: 'body', label: 'Song Body', multiline: true },
]

class AddSong extends React.Component {
  renderFields() {
    return FIELDS.map(({ name, label, placeholder, multiline }) => (
      <Field
        key={name}
        component={renderTextField}
        type="text"
        name={name}
        label={label}
        placeholder={placeholder}
        multiline={multiline}
        fullWidth
      />
    ))
  }

  handleSubmit = () => {
    console.log('submit', this.props.addSongValues)
    this.props.saveSong(this.props.addSongValues, this.props.history)
  }

  handleCancel = () => {
    this.props.history.push('/songs')
  }

  render() {
    return (
      <div>
        <h1>Add song</h1>
        <form onSubmit={this.handleSubmit} style={{ padding: '10px 15px' }}>
          {this.renderFields()}

          <Button variant="flat" color="secondary" onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleSubmit}>
            Save
          </Button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  console.log(values)
}

const mapStateToProps = ({ form }) => ({
  addSongValues: form.addSong ? form.addSong.values : {},
})
const mapDispatchToProps = dispatch => ({
  saveSong: (song, history) => dispatch(actions.saveSong(song, history)),
})

export default reduxForm({
  form: 'addSong',
  validate,
})(connect(mapStateToProps, mapDispatchToProps)(AddSong))
