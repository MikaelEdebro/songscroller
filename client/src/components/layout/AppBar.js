import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay'
import Tooltip from '@material-ui/core/Tooltip'
import Logo from './Logo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Wrapper from '../../hoc/Wrapper'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  roundButton: {
    borderRadius: '50%',
    minWidth: 'auto',
    width: '44px',
    height: '44px',
  },
}

class ButtonAppBar extends React.Component {
  handleLogin = () => {
    document.location.href = '/api/auth/google'
  }

  handleLogout = () => {
    document.location.href = '/api/auth/logout'
  }

  goToRoute = route => {
    this.props.history.push(route)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Logo />
            </Typography>

            {this.props.isAuthenticated ? (
              <Wrapper>
                <Tooltip id="tooltip-songs" title="Songs">
                  <IconButton
                    color="inherit"
                    className={classes.roundButton}
                    onClick={() => this.goToRoute('/songs')}
                    aria-label="Songs"
                  >
                    <MusicNoteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip id="tooltip-playlists" title="Playlists">
                  <IconButton
                    color="inherit"
                    className={classes.roundButton}
                    onClick={() => this.goToRoute('/playlists')}
                    aria-label="Playlists"
                  >
                    <PlaylistPlayIcon />
                  </IconButton>
                </Tooltip>
              </Wrapper>
            ) : null}

            {this.props.isAuthenticated ? (
              <Button color="inherit" onClick={this.handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={this.handleLogin}>
                Login with Google
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth || false,
})

export default withRouter(connect(mapStateToProps)(withStyles(styles)(ButtonAppBar)))
