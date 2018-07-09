import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

const Menu = props => (
  <Button variant="fab" color="primary" aria-label="add" onClick={props.clicked}>
    <Icon>menu</Icon>
  </Button>
)

export default Menu
