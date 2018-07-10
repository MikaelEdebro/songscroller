import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const SongOptionsWrapper = styled.div`
  position: absolute;
  background: white;
  right: 10px;
  bottom: 90px;
  width: 160px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s linear;
  transform: ${props => (!props.show ? 'translateX(176px)' : 'initial')};
`

const GridWrapper = styled(Grid)`
  padding: 6px 10px;
`

const songOptions = props => {
  return (
    <SongOptionsWrapper show={props.showOptions}>
      <GridWrapper container direction="column">
        <Typography variant="caption">Font Size</Typography>
        <Grid container alignItems="center">
          <IconButton
            color="inherit"
            onClick={() => props.changeFontSize(-1)}
            title="Decrease font"
          >
            <Icon>remove_circle_outline</Icon>
          </IconButton>
          <Icon style={{ fontSize: 36, margin: '0 2px' }}>format_size</Icon>
          <IconButton color="inherit" onClick={() => props.changeFontSize(1)} title="Increase font">
            <Icon>add_circle_outline</Icon>
          </IconButton>
        </Grid>
      </GridWrapper>

      <Divider />

      <GridWrapper container direction="column">
        <Typography variant="caption">Scroll Speed</Typography>
        <Grid container alignItems="center">
          <IconButton
            color="inherit"
            onClick={() => props.changeScrollSpeed(5)}
            title="Scroll slower"
          >
            <Icon>remove_circle_outline</Icon>
          </IconButton>
          <Icon style={{ fontSize: 36, margin: '0 2px' }}>access_time</Icon>
          <IconButton
            color="inherit"
            onClick={() => props.changeScrollSpeed(-5)}
            title="Scroll faster"
          >
            <Icon>add_circle_outline</Icon>
          </IconButton>
        </Grid>
      </GridWrapper>

      <Divider />

      <GridWrapper container direction="column">
        <Typography variant="caption">Transpose</Typography>
        <Grid container alignItems="center">
          <IconButton color="inherit" onClick={() => props.transposeSong(-1)} title="Semitone Down">
            <Icon>remove_circle_outline</Icon>
          </IconButton>
          <Icon style={{ fontSize: 36, margin: '0 2px' }}>translate</Icon>
          <IconButton color="inherit" onClick={() => props.transposeSong(1)} title="Semitone Up">
            <Icon>add_circle_outline</Icon>
          </IconButton>
        </Grid>
      </GridWrapper>
    </SongOptionsWrapper>
  )
}

export default songOptions
