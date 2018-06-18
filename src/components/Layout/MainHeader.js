import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Logo from './Logo'

const MainHeaderWrapper = styled.header`
  position: absolute;
  background-color: #fafafa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0;
  margin-bottom: 5px;
  width: 100%;
  height: 50px;
  transition: all 0.5s ease-out;
  transform: ${props => (props.show ? 'initial' : 'translateY(-50px)')};
  z-index: 100;
`
class MainHeader extends React.Component {
  render() {
    return (
      <MainHeaderWrapper show={this.props.showHeader}>
        <Logo />
      </MainHeaderWrapper>
    )
  }
}

const mapStateToProps = state => ({
  showHeader: state.showHeader,
})

export default connect(mapStateToProps)(MainHeader)
