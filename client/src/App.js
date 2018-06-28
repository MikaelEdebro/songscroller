import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
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
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/songs/:title" component={SongContainer} />
          <Route exact path="/songs" component={SongsContainer} />
          <Route exact path="/" component={Landing} />
        </Switch>
      )
    }

    return (
      <BrowserRouter>
        <div>{routes}</div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actions.fetchUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
