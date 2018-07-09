import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  button: {
    boxShadow: 'none',
  },
})
const BackButton = props => {
  const { classes } = props
  return (
    <Button
      variant="fab"
      aria-label="back"
      onClick={() => props.history.goBack()}
      className={classes.button}
    >
      <Icon>arrow_back</Icon>
    </Button>
  )
}

export default withRouter(withStyles(styles)(BackButton))
