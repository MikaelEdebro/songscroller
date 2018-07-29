import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'

const SongSettingsWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 90px;
  width: 160px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s linear;
  transform: ${props => (!props.show ? 'translateX(176px)' : 'initial')};
`

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.default,
    userSelect: 'none',
  },
  grid: {
    padding: '6px 10px',
  },
  icon: {
    color: theme.palette.text.primary,
  },
})

const SongSettings = props => {
  const { classes } = props
  return (
    <SongSettingsWrapper show={props.show} className={classes.wrapper}>
      <Grid container direction="column" className={classes.grid}>
        <Typography variant="caption">Font Size ({props.fontSize})</Typography>
        <Grid container alignItems="center">
          <IconButton
            color="inherit"
            onClick={() => props.changeFontSize(-1)}
            title="Decrease font"
          >
            <Icon className={classes.icon}>remove_circle_outline</Icon>
          </IconButton>
          <Icon style={{ fontSize: 36, margin: '0 2px' }} className={classes.icon}>
            format_size
          </Icon>
          <IconButton color="inherit" onClick={() => props.changeFontSize(1)} title="Increase font">
            <Icon className={classes.icon}>add_circle_outline</Icon>
          </IconButton>
        </Grid>
      </Grid>

      <Divider />

      <Grid container direction="column">
        <Typography variant="caption">
          Transpose ({formatTranspose(props.song.transposeTotal)})
        </Typography>
        <Grid container alignItems="center">
          <IconButton color="inherit" onClick={() => props.transposeSong(-1)} title="Semitone Down">
            <Icon className={classes.icon}>remove_circle_outline</Icon>
          </IconButton>
          <Icon style={{ fontSize: 36, margin: '0 2px' }} className={classes.icon}>
            translate
          </Icon>
          <IconButton color="inherit" onClick={() => props.transposeSong(1)} title="Semitone Up">
            <Icon className={classes.icon}>add_circle_outline</Icon>
          </IconButton>
        </Grid>
      </Grid>
    </SongSettingsWrapper>
  )
}

export default withStyles(styles)(SongSettings)

function formatTranspose(semitones = 0) {
  if (!semitones) {
    return semitones
  }

  return (semitones > 0 ? '+' : null) + semitones
}
