import React from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './components/Layout/Layout'
import SongsContainer from './components/Song/SongsContainer'
import SongContainer from './components/Song/SongContainer'
import AddSong from './components/Song/Edit/AddSong'
import EditSong from './components/Song/Edit/EditSong'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import * as actions from './actions'
import ScrollToTop from './hoc/ScrollToTop'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    let routes = (
      <div>
        <Route exact path="/" component={Landing} />
      </div>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/songs/new" component={AddSong} />
          <Route exact path="/songs/edit/:id" component={EditSong} />
          <Route exact path="/songs/:id" component={SongContainer} />
          <Route exact path="/songs" component={SongsContainer} />
          <Route exact path="/" component={Landing} />
        </Switch>
      )
    }

    return (
      <Layout isAuthenticated={this.props.isAuthenticated}>
        <ScrollToTop />
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actions.fetchUser()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
