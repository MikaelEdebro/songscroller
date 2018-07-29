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
  playButtonWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
  replayButton: {
    position: 'absolute',
    top: '14px',
    right: '-30px',
    cursor: 'pointer',
    color: theme.palette.text.primary,
  },
  grid: {
    maxWidth: '1024px',
    margin: '0 auto',
  },
  icon: {
    color: theme.palette.text.primary,
  },
})

const songControls = props => {
  const { classes } = props

  return (
    <SongControlsWrapper show={props.show} className={classes.wrapper}>
      <Grid container justify="space-between" alignItems="center" className={classes.grid}>
        <Grid item xs={4} align="left">
          <div style={{ display: 'inline-block', textAlign: 'center' }}>
            <Typography variant="caption">
              Scroll Speed ({+props.scrollSpeed.toFixed(1)})
            </Typography>
            <Grid container alignItems="center">
              <IconButton
                color="inherit"
                onClick={() => props.changeScrollSpeed(10)}
                title="Scroll slower"
              >
                <Icon className={classes.icon}>remove_circle_outline</Icon>
              </IconButton>
              {/* <Icon style={{ fontSize: 36, margin: '0 2px' }}>access_time</Icon> */}
              <IconButton
                color="inherit"
                onClick={() => props.changeScrollSpeed(-10)}
                title="Scroll faster"
              >
                <Icon className={classes.icon}>add_circle_outline</Icon>
              </IconButton>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.playButtonWrapper}>
            <Button
              variant="fab"
              color="secondary"
              aria-label={props.isScrolling ? 'Pause' : 'Play'}
              onClick={props.isScrolling ? props.pause : props.play}
              title={props.isScrolling ? 'Pause' : 'Play'}
            >
              <Icon style={{ fontSize: 36 }} className={classes.icon}>
                {props.isScrolling ? 'pause' : 'play_arrow'}
              </Icon>
            </Button>

            <Icon
              style={{ fontSize: 30 }}
              onClick={props.replay}
              title="Replay"
              className={classes.replayButton}
            >
              replay
            </Icon>
          </div>
        </Grid>
        <Grid item xs={4} align="right">
          <IconButton
            onClick={() => props.toggleSettings(!props.showSettings)}
            color="inherit"
            aria-label="Menu"
            title={props.showSettings ? 'Close' : 'Settings'}
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

export default withStyles(styles)(songControls)
