import React from 'react'
import AppBar from './AppBar'

class Layout extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <AppBar />
        <div>{this.props.children}</div>
      </div>
    )
  }
}

export default Layout
