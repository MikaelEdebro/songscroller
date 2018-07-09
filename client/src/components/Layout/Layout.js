import React from 'react'
import AppBar from './AppBar'

const layout = props => {
  return (
    <div>
      {props.isAuthenticated ? <AppBar /> : null}
      <div>{props.children}</div>
    </div>
  )
}

export default layout
