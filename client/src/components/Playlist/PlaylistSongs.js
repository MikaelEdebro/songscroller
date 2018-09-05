import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { reorder } from '../../core/utility'
import * as actions from '../../actions'
import ListItem from '../core/ListItem'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `0 0 12px 0`,

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  width: '100%',
})

const styles = theme => ({
  icon: {
    color:
      theme.palette.type === 'light' ? theme.palette.text.secondary : theme.palette.text.primary,
  },
})

class PlaylistSongs extends Component {
  static propTypes = {
    playlist: PropTypes.object.isRequired,
    isEditMode: PropTypes.bool,
  }

  static defaultProps = {
    isEditMode: false,
  }

  state = {
    items: this.props.playlist.songs,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playlist.songs.length !== this.props.playlist.songs.length) {
      this.setState({ items: this.props.playlist.songs })
    }
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(this.state.items, result.source.index, result.destination.index)

    this.setState({
      items,
    })

    const songIds = items.map(item => item._id)
    const playlist = {
      ...this.props.playlist,
      songIds,
      songs: items,
    }
    this.props.savePlaylistLocal(playlist)
  }

  handleSongClick = songId => {
    this.props.history.push(`/songs/${songId}?playlist=true`)
  }

  deleteSongFromPlaylist = songIndex => {
    const items = [...this.state.items]
    items.splice(songIndex, 1)
    const songIds = items.map(item => item._id)
    this.setState({ items })

    const newPlaylist = { ...this.props.playlist, songIds, songs: items }
    this.props.savePlaylistLocal(newPlaylist)
  }

  render() {
    if (!this.state.items || !this.state.items.length) {
      // show loader
      return null
    }

    const { classes } = this.props
    const DeleteIcon = props => (
      <IconButton
        color="inherit"
        onClick={() => this.deleteSongFromPlaylist(props.songIndex)}
        title="Remove song from playlist"
      >
        <Icon className={classes.icon}>delete</Icon>
      </IconButton>
    )
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {this.state.items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <ListItem
                        clicked={() => this.handleSongClick(item._id)}
                        actionComponent={<DeleteIcon songIndex={index} />}
                      >
                        {index + 1}. {item.artist} - {item.title}
                      </ListItem>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  savePlaylistLocal: values => dispatch(actions.savePlaylistLocal(values)),
  savePlaylistDb: playlist => dispatch(actions.savePlaylistDb(playlist)),
})

PlaylistSongs = connect(null, mapDispatchToProps)(PlaylistSongs)
PlaylistSongs = withStyles(styles)(PlaylistSongs)
PlaylistSongs = withRouter(PlaylistSongs)

export default PlaylistSongs
