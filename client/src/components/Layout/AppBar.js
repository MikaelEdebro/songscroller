import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Logo from './Logo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Drawer from './Drawer'
import * as actions from '../../actions'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    width: '100%',
    maxWidth: '1024px',
    margin: '0 auto',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

class ButtonAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    showDrawer: false,
    isDarkMode: false,
  }

  componentDidMount() {
    this.setState({ isDarkMode: this.props.user.settings.darkMode })
  }

  toggleDrawer = value => {
    this.setState({ showDrawer: value, isDarkMode: this.props.user.settings.darkMode })
  }

  handleLogin = () => {
    document.location.href = '/api/auth/google'
  }

  handleLogout = () => {
    document.location.href = '/api/auth/logout'
  }

  toggleDarkMode = () => {
    const user = { ...this.props.user, settings: { darkMode: !this.props.user.settings.darkMode } }
    this.setState({ isDarkMode: !this.props.user.settings.darkMode })
    this.props.editUser(user)
  }

  goToRoute = route => {
    this.toggleDrawer(false)
    this.props.history.push(route)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton
              onClick={() => this.toggleDrawer(true)}
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Logo />
            </Typography>

            <IconButton
              color="inherit"
              onClick={() => this.goToRoute('/songs/add')}
              aria-label="Add Song"
            >
              <Icon>add</Icon>
            </IconButton>
            <IconButton color="inherit" onClick={() => this.goToRoute('/songs')} aria-label="Songs">
              <Icon>music_note</Icon>
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => this.goToRoute('/playlists')}
              aria-label="Playlists"
            >
              <Icon>playlist_play</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          show={this.state.showDrawer}
          toggleDrawer={this.toggleDrawer}
          goToRoute={this.goToRoute}
          logout={this.handleLogout}
          toggleDarkMode={this.toggleDarkMode}
          isDarkMode={this.state.isDarkMode}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth || false,
  user: auth.user,
})

const mapDispatchToProps = dispatch => ({
  editUser: user => dispatch(actions.editUser(user)),
})

ButtonAppBar = withStyles(styles)(ButtonAppBar)
ButtonAppBar = connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar)
ButtonAppBar = withRouter(ButtonAppBar)

export default ButtonAppBar
