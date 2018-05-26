import React from 'react'
import MaterialIcon from 'components/UI/MaterialIcon'
import styled from 'styled-components'

const SongControlsWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: violet;
  transition: all 0.5s ease-in-out;
  padding: 6px 5px;
  transform: ${props => (!props.show ? 'translateY(50px)' : 'initial')};
`
const ControlColumn = styled.div`
  flex: 0 0 33.33%;
  text-align: ${props => props.align || 'left'};
`

const songControls = props => {
  return (
    <SongControlsWrapper show={props.show}>
      <ControlColumn>
        <MaterialIcon
          type="remove_circle_outline"
          size="30"
          clicked={props.decreaseFont}
          title="Decrease font"
        />
        <MaterialIcon type="format_size" size="32" />
        <MaterialIcon
          type="add_circle_outline"
          size="30"
          clicked={props.increaseFont}
          title="Increase font"
        />
      </ControlColumn>
      <ControlColumn align="center">
        <MaterialIcon
          type={props.isScrolling ? 'pause_circle_outline' : 'play_circle_outline'}
          size="36"
          clicked={props.isScrolling ? props.pause : props.play}
        />
        <MaterialIcon type="replay" size="36" clicked={props.replay} />
      </ControlColumn>
      <ControlColumn align="right">
        <MaterialIcon
          type="remove_circle_outline"
          size="30"
          clicked={props.decreaseFont}
          title="Slow down"
        />
        <MaterialIcon type="access_time" size="32" />
        <MaterialIcon
          type="add_circle_outline"
          size="30"
          clicked={props.increaseFont}
          title="Speed up"
        />
      </ControlColumn>
    </SongControlsWrapper>
  )
}

export default songControls
