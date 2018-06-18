import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Logo from 'components/Layout/Logo'
import Icon from '@material-ui/core/Icon'

const SongHeaderWrapper = styled.header`
  position: absolute;
  display: flex;
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
class SongHeader extends React.Component {
  render() {
    return (
      <SongHeaderWrapper show={this.props.show}>
        <Icon style={{ fontSize: 30 }} onClick={this.props.history.goBack} title="Go Back">
          arrow_back_ios
        </Icon>
        <Logo />
      </SongHeaderWrapper>
    )
  }
}

export default withRouter(SongHeader)
