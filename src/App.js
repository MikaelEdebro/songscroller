import React from 'react'
import MainHeader from 'components/Layout/MainHeader'
import SongContainer from 'components/Song/SongContainer'
import songs from 'mock/songs'

class App extends React.Component {
  state = {
    song: songs[0],
  }

  render() {
    return (
      <div>
        <MainHeader />
        <SongContainer song={this.state.song} />
      </div>
    )
  }
}

export default App
