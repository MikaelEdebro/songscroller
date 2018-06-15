import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MainHeader from 'components/Layout/MainHeader'
import SongsContainer from 'containers/SongsContainer'
import SongContainer from 'containers/SongContainer'

class App extends React.Component {
  render() {
    return (
      <div>
        <MainHeader />

        <Switch>
          <Route path="/songs/:title" component={SongContainer} />
          <Route path="/songs" component={SongsContainer} />
        </Switch>
      </div>
    )
  }
}

export default App
