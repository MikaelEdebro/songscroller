import React from 'react'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'

const SongControlsWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background: violet;
  transition: all 0.5s ease-out;
  padding: 6px 5px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
  transform: ${props => (!props.show ? 'translateY(55px)' : 'initial')};
`

const songControls = props => {
  return (
    <SongControlsWrapper show={props.show}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Icon style={{ fontSize: 30 }} onClick={props.decreaseFont} title="Decrease font">
            remove_circle_outline
          </Icon>
          <Icon style={{ fontSize: 34 }}>format_size</Icon>
          <Icon style={{ fontSize: 30 }} onClick={props.increaseFont} title="Increase font">
            add_circle_outline
          </Icon>
        </Grid>
        <Grid item>
          <Icon
            style={{ fontSize: 40 }}
            onClick={props.isScrolling ? props.pause : props.play}
            title={props.isScrolling ? 'Pause' : 'Play'}
          >
            {props.isScrolling ? 'pause_circle_outline' : 'play_circle_outline'}
          </Icon>
          <Icon style={{ fontSize: 30 }} onClick={props.replay} title="Replay">
            replay
          </Icon>
        </Grid>
        <Grid item>
          <Icon style={{ fontSize: 30 }} onClick={props.decreaseFont} title="Slow down">
            remove_circle_outline
          </Icon>
          <Icon style={{ fontSize: 34 }}>access_time</Icon>
          <Icon style={{ fontSize: 30 }} onClick={props.increaseFont} title="Increase font">
            add_circle_outline
          </Icon>
        </Grid>
      </Grid>
    </SongControlsWrapper>
  )
}

export default songControls
