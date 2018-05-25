import React from 'react'
import './SongControls.css'

const songControls = props => (
  <div className={['controls', !props.show ? 'hide' : null].join(' ')}>
    <button id="font-decrease" onClick={props.decreaseFont}>
      Font -
    </button>
    <button id="play" onClick={props.isScrolling ? props.pause : props.play}>
      {props.isScrolling ? 'Pause' : 'Play'}
    </button>
    <button id="font-increase" onClick={props.increaseFont}>
      Font +
    </button>
  </div>
)

export default songControls
