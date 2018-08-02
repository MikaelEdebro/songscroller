import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import PropTypes from 'prop-types'

const ListItem = ({ children, clicked, actionComponent, align, style, marginBottom }) => {
  return (
    <Card style={{ marginBottom: marginBottom ? 12 : 0, ...style }}>
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

ListItem.propTypes = {
  clicked: PropTypes.func,
  actionComponent: PropTypes.object,
  align: PropTypes.string,
}
ListItem.defaultProps = {
  align: 'left',
}
export default ListItem
