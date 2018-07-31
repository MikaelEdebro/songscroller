import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import SongForm from './SongForm'
import validateSong from './validateSong'

class EditSong extends React.Component {
  componentDidMount() {
    this.props.fetchAndSelectSong(this.props.match.params.id)
  }

  handleSubmit = () => {
    const errors = validateSong(this.props.songFormValues)
    if (Object.keys(errors).length) {
      return
    }

    const editedSong = {
      ...this.props.songFormValues,
      fontSizes: this.props.selectedSong.fontSizes,
    }
    this.props.editSong(this.props.match.params.id, editedSong, this.props.history)
  }

  render() {
    return <SongForm onSubmit={this.handleSubmit} onCancel={this.props.history.goBack} />
  }
}

const mapStateToProps = ({ form, song }) => ({
  selectedSong: song.selectedSong,
  songFormValues: form.songForm ? form.songForm.values : {},
})

const mapDispatchToProps = dispatch => ({
  fetchAndSelectSong: songId => dispatch(actions.fetchAndSelectSong(songId)),
  editSong: (songId, values, history) => dispatch(actions.editSong(songId, values, history)),
})

EditSong = connect(mapStateToProps, mapDispatchToProps)(EditSong)

export default EditSong
