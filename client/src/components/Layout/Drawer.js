import React from 'react'
import PropTypes from 'prop-types'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Switch from '@material-ui/core/Switch'
import Icon from '@material-ui/core/Icon'
import Divider from '@material-ui/core/Divider'
import { toggleFullscreen } from '../../core/ui-helpers'
import Logo from './Logo'

const Drawer = props => (
  <SwipeableDrawer
    open={props.show}
    onClose={() => props.toggleDrawer(false)}
    onOpen={() => props.toggleDrawer(true)}
  >
    <Logo adjustSize padding={'10px 10px 0'} maxWidth={'240px'} />
    <List component="nav">
      <ListItem button onClick={() => props.goToRoute('/songs')}>
        <ListItemIcon>
          <Icon>music_note</Icon>
        </ListItemIcon>
        <ListItemText primary="Songs" />
      </ListItem>
      <ListItem button onClick={() => props.goToRoute('/playlists')}>
        <ListItemIcon>
          <Icon>playlist_play</Icon>
        </ListItemIcon>
        <ListItemText primary="Playlists" />
      </ListItem>
      <ListItem button onClick={props.logout}>
        <ListItemIcon>
          <Icon>exit_to_app</Icon>
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItem>
    </List>
    <Divider />
    <List subheader={<ListSubheader>Settings</ListSubheader>} style={{ minWidth: '250px' }}>
      <ListItem>
        <ListItemIcon>
          <Icon>fullscreen</Icon>
        </ListItemIcon>
        <ListItemText primary="Fullscreen" />
        <ListItemSecondaryAction>
          <Switch onChange={toggleFullscreen} checked={false} />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <Icon>remove_red_eye</Icon>
        </ListItemIcon>
        <ListItemText primary="Dark Mode" />
        <ListItemSecondaryAction>
          <Switch onChange={props.toggleDarkMode} checked={props.isDarkMode} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </SwipeableDrawer>
)

Drawer.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  goToRoute: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
}

export default Drawer
