import React from 'react'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import SongSettings from './SongSettings'

const SongControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  text-align: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 75px;
  background-color: #fff;
  transition: all 0.5s ease-out;
  padding: 6px 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  transform: ${props => (!props.show ? 'translateY(82px)' : 'initial')};
  z-index: 1200;
`

const songControls = props => {
  return (
    <SongControlsWrapper show={props.show}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Button
            variant="fab"
            color="primary"
            aria-label={props.isScrolling ? 'Pause' : 'Play'}
            onClick={props.isScrolling ? props.pause : props.play}
            title={props.isScrolling ? 'Pause' : 'Play'}
          >
            <Icon style={{ fontSize: 36 }}>{props.isScrolling ? 'pause' : 'play_arrow'}</Icon>
          </Button>

          <Icon style={{ fontSize: 30 }} onClick={props.replay} title="Replay">
            replay
          </Icon>
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'right' }}>
          <IconButton
            onClick={() => props.toggleSettings(!props.showSettings)}
            color="inherit"
            aria-label="Menu"
            title={props.showSettings ? 'Close' : 'Settings'}
          >
            <Icon>{props.showSettings ? 'close' : 'settings'}</Icon>
          </IconButton>
        </Grid>
      </Grid>

      <SongSettings
        show={props.showSettings}
        onClose={() => props.toggleSettings(false)}
        changeFontSize={props.changeFontSize}
        changeScrollSpeed={props.changeScrollSpeed}
      />
    </SongControlsWrapper>
  )
}

export default songControls
