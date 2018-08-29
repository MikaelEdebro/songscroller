import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    background: theme.palette.grey[100],
    color: theme.palette.common.black,
    borderRadius: '50%',
    width: 240,
    height: 240,
    boxShadow: theme.shadows[2],
    textAlign: 'center',
    margin: '0 auto',
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
        {props.icon}
      </Icon>
      <Typography variant="title" color="inherit" gutterBottom>
        {props.description}
      </Typography>
      <Button variant="raised" color="primary" onClick={props.clicked}>
        {props.buttonText}
      </Button>
    </Grid>
  )
}

export default withStyles(styles)(PlaylistAddSongsButton)
