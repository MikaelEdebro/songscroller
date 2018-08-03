import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    background: theme.palette.grey[100],
    borderRadius: '50%',
    width: 240,
    height: 240,
    boxShadow: theme.shadows[2],
  },
  icon: {
    fontSize: 60,
  },
})
const PlaylistAddSongsButton = props => {
  const { classes } = props
  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Icon className={classes.icon} color="primary">
        queue_music
      </Icon>
      <Typography variant="title" gutterBottom>
        Playlist is empty!
      </Typography>
      <Button variant="raised" color="primary" onClick={props.clicked}>
        Add songs
      </Button>
    </Grid>
  )
}

export default withStyles(styles)(PlaylistAddSongsButton)
