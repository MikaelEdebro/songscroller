import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import * as actions from '../../actions'

const ITEM_HEIGHT = 48

class SongMenu extends React.Component {
  state = {
    anchorEl: null,
    deleteConfirmed: false,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null, deleteConfirmed: false })
  }

  confirmDelete = () => {
    this.setState({ deleteConfirmed: true })
  }
  handleDelete = () => {
    this.props.deleteSong(this.props.song._id, this.props.history)
    this.setState({ deleteConfirmed: false })
  }

  handleEdit = () => {
    this.props.selectSong(this.props.song)
    this.props.history.push('/songs/edit/' + this.props.song._id)
  }

  render() {
    const { anchorEl } = this.state

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
          <MenuItem onClick={this.confirmDelete}>
            <Grid container justify="space-between" alignItems="center">
              Delete
              {this.state.deleteConfirmed && (
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={this.handleDelete}
                >
                  Confirm
                </Button>
              )}
            </Grid>
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  selectSong: song => dispatch(actions.selectSong(song)),
  deleteSong: (songId, history) => dispatch(actions.deleteSong(songId, history)),
})

SongMenu = connect(null, mapDispatchToProps)(SongMenu)
SongMenu = withRouter(SongMenu)

export default SongMenu
