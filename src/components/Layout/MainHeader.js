import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'

const MainHeaderWrapper = styled.header`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0;
  margin-bottom: 5px;
  height: 50px;
  transition: all 0.5s ease-in-out;
  transform: ${props => (!props.showControls ? 'translateY(-50px)' : 'initial')};
`
const mainHeader = props => (
  <MainHeaderWrapper showControls={props.showControls}>
    <Logo />
  </MainHeaderWrapper>
)

export default mainHeader
