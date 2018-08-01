import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import PropTypes from 'prop-types'

const SongListItem = ({ children, song, clicked, actionComponent, align, style }) => {
  return (
    <Card style={style}>
      <CardHeader
        action={actionComponent}
        title={
          <div
            onClick={clicked}
            style={{ cursor: 'pointer', fontSize: '18px', lineHeight: '22px', textAlign: align }}
          >
            {children}
          </div>
        }
        style={{ padding: '12px 22px' }}
      />
    </Card>
  )
}

SongListItem.propTypes = {
  song: PropTypes.object.isRequired,
  clicked: PropTypes.func,
  actionComponent: PropTypes.object,
  align: PropTypes.string,
}
SongListItem.defaultProps = {
  align: 'left',
}
export default SongListItem
