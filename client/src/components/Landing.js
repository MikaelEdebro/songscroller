import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import googleLogo from '../assets/auth/google-logo.svg'
import facebookLogo from '../assets/auth/facebook-logo.svg'
import siteConfig from '../siteConfig'

const LoginButton = styled(Paper)`
  margin: 0 auto 10px;
  max-width: 300px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
`
const LoginIcon = styled.div`
  width: 60px;
  text-align: left;

  img {
    width: 40px;
    height: 40px;
  }
`

const AUTH_TYPES = [
  { identifier: 'google', text: 'Login with Google', iconUrl: googleLogo, url: '/api/auth/google' },
  {
    identifier: 'facebook',
    text: 'Login with Facebook',
    iconUrl: facebookLogo,
    url: '/api/auth/facebook',
  },
]

class Landing extends React.Component {
  componentDidMount() {
    console.log(googleLogo)
    console.log('Landing')
  }

  handleLogin = url => {
    document.location.href = url
  }

  renderLoginButtons = () => {
    return AUTH_TYPES.map(({ text, iconUrl, url, identifier }) => (
      <LoginButton onClick={() => this.handleLogin(url)} key={identifier}>
        <LoginIcon>
          <img src={iconUrl} alt={text} />
        </LoginIcon>
        {text}
      </LoginButton>
    ))
  }

  render() {
    return (
      <div>
        <Typography variant="display4" align="center">
          {siteConfig.name}
        </Typography>
        <Typography variant="subheading" align="center">
          {siteConfig.tagline}
        </Typography>

        {!this.props.isAuthenticated ? this.renderLoginButtons() : null}
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth,
})
export default connect(mapStateToProps)(Landing)
