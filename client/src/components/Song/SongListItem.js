import React from 'react'
import styled from 'styled-components'

const songListItem = props => {
  const SongListItemWrapper = styled.div`
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 5px;
    cursor: pointer;
  `
  return (
    <SongListItemWrapper onClick={props.clicked}>
      {props.artist} - {props.title}
    </SongListItemWrapper>
  )
}

export default songListItem
