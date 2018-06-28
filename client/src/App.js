import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import SongsContainer from './components/Song/SongsContainer'
import SongContainer from './components/Song/SongContainer'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import * as actions from './actions'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Redirect to="/" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/songs/:title" component={SongContainer} />
          <Route path="/songs" component={SongsContainer} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Landing} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return <div>{routes}</div>
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actions.fetchUser()),
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
