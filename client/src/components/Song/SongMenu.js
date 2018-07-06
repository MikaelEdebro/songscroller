import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import * as actions from '../../actions'

const ITEM_HEIGHT = 48

class SongMenu extends React.Component {
  state = {
    anchorEl: null,
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleDelete = () => {
    this.props.deleteSong(this.props.songId, this.props.history)
  }

  handleEdit = () => {
    this.props.history.push('/songs/edit/' + this.props.songId)
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
          <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
        </Menu>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteSong: (songId, history) => dispatch(actions.deleteSong(songId, history)),
})

export default withRouter(connect(null, mapDispatchToProps)(SongMenu))
