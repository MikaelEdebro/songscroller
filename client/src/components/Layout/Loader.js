import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loader = props => (
  <Grid container justify="center" alignItems="center" style={{ padding: '30px 20px' }}>
    <Grid item xs={12} align="center">
      <CircularProgress />
    </Grid>
    <Grid item xs={12} align="center">
      {props.text}
    </Grid>
  </Grid>
)

export default Loader
