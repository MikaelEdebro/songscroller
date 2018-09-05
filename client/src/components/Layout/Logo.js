import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import siteConfig from '../../siteConfig'
import logoUrl from '../../assets/songscroller-logo.svg'

const LogoWrapper = styled.div`
  width: ${props => (props.adjustSize ? '100%' : 'auto')};
  padding: ${props => props.padding || 0};
  max-width: ${props => props.maxWidth || 'none'};
  font-size: 18px;

  @media (min-width: 660px) {
    font-size: 25px;
  }

  a {
    color: black;
    text-decoration: none;
    border: 1px solid transparent;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
`
const Logo = props => (
  <LogoWrapper {...props}>
    <Link to={props.isAuthenticated ? '/dashboard' : '/'}>
      {props.textOnly ? siteConfig.name : <img src={logoUrl} alt={siteConfig.name} />}
    </Link>
  </LogoWrapper>
)

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth && auth.user,
})

export default connect(mapStateToProps)(Logo)
