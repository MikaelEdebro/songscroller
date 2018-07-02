import React from 'react'
import MainHeader from './MainHeader'
import { connect } from 'react-redux'

class Layout extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <MainHeader show={this.props.showSongHeader || this.props.isPaused} />
        <div>{this.props.children}</div>
      </div>
    )
  }
}

const mapStateToProps = ({ song }) => ({
  showSongHeader: song.showSongHeader,
  isPaused: song.isPaused,
})
export default connect(mapStateToProps)(Layout)
