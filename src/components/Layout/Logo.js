import React from 'react'
import styled from 'styled-components'

const LogoWrapper = styled.div`
  height: 100%;
  img {
    max-height: 100%;
  }
`
const logo = props => (
  <LogoWrapper>
    <img
      src="http://www.djdesignerlab.com/wp-content/uploads/2013/07/paperclip_logo_1.jpg"
      alt=""
      width="180"
    />
  </LogoWrapper>
)

export default logo
