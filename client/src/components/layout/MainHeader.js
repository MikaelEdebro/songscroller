import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import BackButton from './BackButton'
import Menu from './Menu'

const MainHeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: #ededed;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  transition: all 0.5s ease-out;
  transform: ${props => (props.show ? 'initial' : 'translateY(-80px)')};
  z-index: 100;

  .header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 10px;
    flex: 0 0 100%;
  }
`
const MainHeader = props => (
  <MainHeaderWrapper show={props.show}>
    <div className="header-inner">
      <BackButton />
      <Logo />
      <Menu />
    </div>
  </MainHeaderWrapper>
)

export default MainHeader
