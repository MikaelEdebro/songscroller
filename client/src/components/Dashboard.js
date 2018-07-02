import React from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
  state = {}

  componentDidMount() {
    console.log('Dashboard')
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Link to="/songs">Songs</Link>
      </div>
    )
  }
}
export default Dashboard
