import React from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './components/Layout/Layout'
import Landing from './components/Landing'
import * as actions from './actions'
import ScrollToTop from './hoc/ScrollToTop'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import deepPurple from '@material-ui/core/colors/deepPurple'
import pink from '@material-ui/core/colors/pink'
import { defaultUserSettings } from './core/constants'
import AuthenticatedRoutes from './AuthenticatedRoutes'

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
      routes = <AuthenticatedRoutes />
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
