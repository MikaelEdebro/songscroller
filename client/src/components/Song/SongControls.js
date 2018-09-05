import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import SongSettings from './SongSettings'
import debounce from 'lodash/debounce'

const SongControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  text-align: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  transition: all 0.5s ease-out;
  padding: 6px 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  transform: ${props => (!props.show ? 'translateY(87px)' : 'initial')};
  z-index: 1200;
  user-select: none;
`

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
  },
  playButton: {
    background: 'linear-gradient(135.41deg, #B46DCF 8.4%, #651882 97.09%)',
    [theme.breakpoints.down('xs')]: {
      width: 50,
      height: 50,
    },
  },
  replayButton: {
    cursor: 'pointer',
    color: theme.palette.text.primary,
  },
  grid: {
    maxWidth: '1024px',
    margin: '0 auto',
  },
  icon: {
    color: theme.palette.text.primary,
    fontSize: 26,
    [theme.breakpoints.up('sm')]: {
      fontSize: 32,
    },
  },
  iconButton: {
    width: 34,
    height: 34,
    [theme.breakpoints.up('sm')]: {
      width: 48,
      height: 48,
    },
  },
})

const SongControls = props => {
  const { classes } = props

  return (
    <SongControlsWrapper show={props.show} className={classes.wrapper}>
      <Grid container justify="space-between" alignItems="center" className={classes.grid}>
        <Grid item xs={3} align="left">
          <div style={{ display: 'inline-block', textAlign: 'center' }}>
            <Typography variant="caption">
              Scroll Speed ({+props.scrollSpeed.toFixed(1)})
            </Typography>
            <Grid container alignItems="center">
              <IconButton
                color="inherit"
                onClick={() => props.changeScrollSpeed(10)}
                title="Scroll slower"
                className={classes.iconButton}
              >
                <Icon className={classes.icon}>remove_circle_outline</Icon>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => props.changeScrollSpeed(-10)}
                title="Scroll faster"
                className={classes.iconButton}
              >
                <Icon className={classes.icon}>add_circle_outline</Icon>
              </IconButton>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={6} container justify="center" alignItems="center">
          {props.isPlaylistMode && (
            <Grid item>
              <IconButton
                color="inherit"
                onClick={props.previousSongInPlaylist}
                title="Previous song"
                className={classes.iconButton}
              >
                <Icon className={classes.icon}>skip_previous</Icon>
              </IconButton>
            </Grid>
          )}
          <Grid item>
            <Grid container alignItems="center">
              <Button
                variant="fab"
                color="secondary"
                aria-label={props.isScrolling ? 'Pause' : 'Play'}
                onClick={props.isScrolling ? props.pause : props.play}
                title={(props.isScrolling ? 'Pause' : 'Play') + ' (Space)'}
                className={classes.playButton}
              >
                <Icon style={{ fontSize: 36, color: 'white' }} className={classes.icon}>
                  {props.isScrolling ? 'pause' : 'play_arrow'}
                </Icon>
              </Button>
            </Grid>
          </Grid>
          {props.isPlaylistMode && (
            <Grid item>
              <IconButton
                color="inherit"
                onClick={props.nextSongInPlaylist}
                title="Next song"
                className={classes.iconButton}
              >
                <Icon className={classes.icon}>skip_next</Icon>
              </IconButton>
            </Grid>
          )}
          <IconButton
            color="inherit"
            onClick={props.replay}
            title="Replay"
            className={classes.iconButton}
          >
            <Icon className={classes.replayButton}>replay</Icon>
          </IconButton>
        </Grid>
        <Grid item xs={2} sm={3} align="right">
          <IconButton
            onClick={() => props.toggleSettings(!props.showSettings)}
            color="inherit"
            aria-label="Menu"
            title={props.showSettings ? 'Close' : 'Settings'}
            className={classes.iconButton}
          >
            <Icon className={classes.icon}>{props.showSettings ? 'close' : 'settings'}</Icon>
          </IconButton>
        </Grid>
      </Grid>

      <SongSettings
        show={props.showSettings}
        onClose={() => props.toggleSettings(false)}
        changeFontSize={props.changeFontSize}
        changeScrollSpeed={props.changeScrollSpeed}
        transposeSong={debounce(props.transposeSong, 400)}
        song={props.song}
        fontSize={props.fontSize}
      />
    </SongControlsWrapper>
  )
}

export default withStyles(styles)(SongControls)
