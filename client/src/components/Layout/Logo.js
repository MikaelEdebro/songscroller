import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const LogoWrapper = styled.div`
  height: 100%;
  font-size: 30px;

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
      SongScroller
    </Link>
  </LogoWrapper>
)

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth && auth.user,
})

export default connect(mapStateToProps)(Logo)
