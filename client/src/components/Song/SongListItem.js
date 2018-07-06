import React from 'react'
import SongMenu from './SongMenu'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

const songListItem = ({ song, clicked }) => {
  return (
    <Card style={{ marginBottom: '10px' }}>
      <CardHeader
        action={<SongMenu songId={song._id} />}
        title={
          <div onClick={clicked} style={{ cursor: 'pointer' }}>
            {song.artist + ' - ' + song.title}
          </div>
        }
        style={{ padding: '12px 22px' }}
      />
    </Card>
  )
}

export default songListItem
