import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'

const MainHeaderWrapper = styled.header`
  background-color: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0;
  margin-bottom: 5px;
`
const mainHeader = props => (
  <MainHeaderWrapper>
    <Logo />
  </MainHeaderWrapper>
)

export default mainHeader
