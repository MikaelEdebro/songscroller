import React from 'react'
import AppBar from './AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'

const layout = props => {
  return (
    <div>
      <CssBaseline />
      {props.isAuthenticated ? <AppBar /> : null}
      <div>{props.children}</div>
    </div>
  )
}

export default layout
