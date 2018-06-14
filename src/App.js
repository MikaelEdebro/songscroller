import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MainHeader from 'components/Layout/MainHeader'
import SongsContainer from 'containers/SongsContainer'
import SongContainer from 'containers/SongContainer'
import songs from 'mock/songs'

class App extends React.Component {
  state = {
    song: songs[0],
  }

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
