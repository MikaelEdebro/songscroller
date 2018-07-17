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

class AddSong extends React.Component {
  componentWillMount() {
    this.props.clearSelectedSong()
  }

  handleSubmit = () => {
    const newSong = {
      ...this.props.songFormValues,
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

const mapStateToProps = ({ form }) => ({
  songFormValues: form.songForm ? form.songForm.values : {},
})

const mapDispatchToProps = dispatch => ({
  clearSelectedSong: () => dispatch(actions.clearSelectedSong()),
  addSong: (song, history) => dispatch(actions.addSong(song, history)),
})

AddSong = connect(mapStateToProps, mapDispatchToProps)(AddSong)

export default AddSong
