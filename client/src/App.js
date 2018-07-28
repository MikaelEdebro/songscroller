import React from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './components/Layout/Layout'
import SongsContainer from './components/Song/SongsContainer'
import SongContainer from './components/Song/SongContainer'
import AddSong from './components/Song/Edit/AddSong'
import EditSong from './components/Song/Edit/EditSong'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import Playlists from './components/Playlist/Playlists'
import AddPlaylist from './components/Playlist/Edit/AddPlaylist'
import EditPlaylist from './components/Playlist/Edit/EditPlaylist'
import * as actions from './actions'
import ScrollToTop from './hoc/ScrollToTop'
import Playlist from './components/Playlist/Playlist'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import deepPurple from '@material-ui/core/colors/deepPurple'
import pink from '@material-ui/core/colors/pink'
import { defaultUserSettings } from './core/constants'

class App extends React.Component {
  componentWillMount() {
    this.props.fetchUser()
  }

  getUserSettings = () => {
    if (!this.props.user || !this.props.user.settings) {
      return defaultUserSettings
    }

    return this.props.user.settings
  }

  getTheme = () => {
    const userSettings = this.getUserSettings()
    return createMuiTheme({
      palette: {
        type: userSettings.darkMode ? 'dark' : 'light',
        primary: deepPurple,
        secondary: pink,
      },
    })
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/songs/add" component={AddSong} />
          <Route exact path="/songs/edit/:id" component={EditSong} />
          <Route exact path="/songs/:id" component={SongContainer} />
          <Route exact path="/songs" component={SongsContainer} key={document.location.href} />
          <Route exact path="/playlists/add" component={AddPlaylist} />
          <Route exact path="/playlists/edit/:id" component={EditPlaylist} />
          <Route exact path="/playlists/:id" component={Playlist} />
          <Route exact path="/playlists" component={Playlists} />
          <Route exact path="/" component={Landing} />
          <Route render={() => <Redirect to="/dashboard" />} />
        </Switch>
      )
    }

    return (
      <MuiThemeProvider theme={this.getTheme()}>
        <Layout isAuthenticated={this.props.isAuthenticated}>
          <ScrollToTop />
          {routes}
        </Layout>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
  isAuthenticated: auth && auth.user,
  loginCheckCompleted: auth.loginCheckCompleted,
})

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(actions.fetchUser()),
})

App = connect(mapStateToProps, mapDispatchToProps)(App)
App = withRouter(App)

export default App
