import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import siteConfig from '../../siteConfig'

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
      {/* <img
        src="http://www.djdesignerlab.com/wp-content/uploads/2013/07/paperclip_logo_1.jpg"
        alt=""
        width="180"
      /> */}
      {siteConfig.name}
    </Link>
  </LogoWrapper>
)

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth && auth.user,
})

export default connect(mapStateToProps)(Logo)
