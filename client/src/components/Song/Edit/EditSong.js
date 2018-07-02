import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import * as actions from '../../../actions'

const EditSongWrapper = styled.div`
  padding: 60px 10px 10px;
`

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: theme.spacing.unit,
    width: '100%',
  },
})

class EditSong extends React.Component {
  state = {
    artist: '',
    title: '',
    body: '',
  }

  componentWillMount() {
    const { song } = this.props
    this.setState({ artist: song.artist, title: song.title, body: song.body })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  saveSong() {
    console.log('save song')
  }

  render() {
    const { classes } = this.props
    return (
      <EditSongWrapper>
        <TextField
          label="Artist"
          value={this.state.artist}
          onChange={this.handleChange('artist')}
          className={classes.textField}
        />
        <TextField
          label="Title"
          value={this.state.title}
          onChange={this.handleChange('title')}
          className={classes.textField}
        />
        <TextField
          label="Body"
          value={this.state.body}
          onChange={this.handleChange('body')}
          className={classes.textField}
          multiline
          rowsMax="20"
        />
        <Button size="large" color="secondary" onClick={() => this.props.setEditMode(false)}>
          Cancel
        </Button>
        <Button size="large" color="primary" onClick={this.saveSong}>
          Save
        </Button>
      </EditSongWrapper>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setEditMode: value => dispatch(actions.setEditMode(value)),
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(EditSong))
