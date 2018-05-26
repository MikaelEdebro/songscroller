import React from 'react'
import styled from 'styled-components'

const materialIcon = props => {
  const MaterialIcon = styled.i`
    font-size: ${props.size ? props.size : 24}px;
    color: ${props.color ? props.color : 'black'};
    cursor: ${props.clicked ? 'pointer' : 'default'};
  `
  return (
    <MaterialIcon onClick={props.clicked} className="material-icons" title={props.title}>
      {props.type}
    </MaterialIcon>
  )
}

export default materialIcon
