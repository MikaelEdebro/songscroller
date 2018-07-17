import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import * as actions from '../../../actions'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import SongForm from './SongForm'

const ButtonsWrapper = styled(Grid)`
  padding: 10px 10px 20px;
`

class EditSong extends React.Component {
  componentDidMount() {
    this.props.fetchAndSelectSong(this.props.match.params.id)
  }

  handleSubmit = () => {
    const editedSong = {
      ...this.props.songFormValues,
      fontSizes: this.props.selectedSong.fontSizes,
    }
    this.props.editSong(this.props.match.params.id, editedSong, this.props.history)
  }

  handleCancel = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="container" style={{ padding: '10px 15px' }}>
        <form onSubmit={this.handleSubmit}>
          <SongForm />

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
  selectedSong: song.selectedSong,
  songFormValues: form.songForm ? form.songForm.values : {},
})

const mapDispatchToProps = dispatch => ({
  fetchAndSelectSong: songId => dispatch(actions.fetchAndSelectSong(songId)),
  editSong: (songId, values, history) => dispatch(actions.editSong(songId, values, history)),
})

EditSong = connect(mapStateToProps, mapDispatchToProps)(EditSong)

export default EditSong
