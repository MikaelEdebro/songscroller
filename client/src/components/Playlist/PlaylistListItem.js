import React from 'react'
//import SongMenu from './SongMenu'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

const songListItem = ({ playlist, clicked }) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <CardHeader
        // action={<SongMenu song={song} />}
        title={
          <div
            onClick={clicked}
            style={{ cursor: 'pointer', fontSize: '18px', lineHeight: '22px' }}
          >
            {playlist.title}
          </div>
        }
        style={{ padding: '12px 22px' }}
      />
    </Card>
  )
}

export default songListItem
