import React from 'react'
import styled from 'styled-components'
import SongMenu from './SongMenu'

const songListItem = ({ song, clicked }) => {
  const SongListItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 5px;
    padding: 4px;
    cursor: pointer;
  `
  return (
    <SongListItemWrapper>
      <div onClick={clicked} style={{ padding: '4px 10px' }}>
        {song.artist} - {song.title}
      </div>
      <SongMenu songId={song._id} />
    </SongListItemWrapper>
  )
}

export default songListItem
