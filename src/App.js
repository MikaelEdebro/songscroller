import React, { Component } from 'react'
import './prototypes'
import SongContainer from 'containers/SongContainer'
import songs from 'mock/songs'

class App extends Component {
  state = {
    song: songs[0],
  }

  render() {
    return (
      <div>
        <SongContainer song={this.state.song} />
      </div>
    )
  }
}

export default App
