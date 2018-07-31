import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import SongForm from './SongForm'
import validateSong from './validateSong'

class AddSong extends React.Component {
  componentWillMount() {
    this.props.clearSelectedSong()
  }

  handleSubmit = () => {
    const errors = validateSong(this.props.songFormValues)
    if (Object.keys(errors).length) {
      return
    }

    const newSong = {
      ...this.props.songFormValues,
      fontSizes: [{ fontSize: 15, viewportWidth: window.innerWidth }],
    }
    this.props.addSong(newSong, this.props.history)
  }

  render() {
    return (
      <SongForm onSubmit={this.handleSubmit} onCancel={() => this.props.history.push('/songs')} />
    )
  }
}

const mapStateToProps = ({ form }) => ({
  songFormValues: form.songForm ? form.songForm.values : {},
})

const mapDispatchToProps = dispatch => ({
  clearSelectedSong: () => dispatch(actions.clearSelectedSong()),
  addSong: (song, history) => dispatch(actions.addSong(song, history)),
})

AddSong = connect(mapStateToProps, mapDispatchToProps)(AddSong)

export default AddSong
