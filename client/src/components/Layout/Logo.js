import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import siteConfig from '../../siteConfig'
import logoUrl from '../../assets/songscroller-logo.svg'

const LogoWrapper = styled.div`
  height: 100%;
  font-size: 18px;

  @media (min-width: 660px) {
    font-size: 25px;
  }

  a {
    color: black;
    text-decoration: none;
  }
  img {
    max-height: 100%;
  }
`
const Logo = props => (
  <LogoWrapper>
    <Link to={props.isAuthenticated ? '/dashboard' : '/'}>
      {props.textOnly ? siteConfig.name : <img src={logoUrl} alt={siteConfig.name} />}
    </Link>
  </LogoWrapper>
)

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth && auth.user,
})

export default connect(mapStateToProps)(Logo)
