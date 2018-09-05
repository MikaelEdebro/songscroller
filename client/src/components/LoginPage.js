import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import googleLogo from '../assets/auth/google-logo.svg'
import facebookLogo from '../assets/auth/facebook-logo.svg'
import backgroundUrl from '../assets/login-bg-mobile.svg'
import Logo from './Layout/Logo'

const LoginPageWrapper = styled.div`
  padding-top: 30px;
  text-align: center;
  max-width: 320px;
  margin: 0 auto;

  img {
    max-width: 100%;
  }
`

const LoginButton = styled(Paper)`
  margin: 0 auto 25px;
  max-width: 300px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
`
const LoginIcon = styled.div`
  width: 60px;
  text-align: left;

  img {
    width: 40px;
    height: 40px;
  }
`
const TaglineList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: right;
  font-size: 21px;
  line-height: 1.4em;
  font-weight: 300;

  li:nth-child(even) {
    color: rgba(0, 0, 0, 0.5);
  }
`

const LoginButtonWrapper = styled.div`
  background: url(${props => props.backgroundUrl});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 -28px;
  height: 80vh;
  padding: 80px 10px;
`

const LoginTagline = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 25px;
  span {
    color: white;
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
  handleLogin = url => {
    document.location.href = url
  }

  render() {
    const LoginButtons = () => {
      return AUTH_TYPES.map(({ text, iconUrl, url, identifier }) => (
        <LoginButton onClick={() => this.handleLogin(url)} key={identifier}>
          <LoginIcon>
            <img src={iconUrl} alt={text} />
          </LoginIcon>
          {text}
        </LoginButton>
      ))
    }

    return (
      <LoginPageWrapper>
        <Logo />
        <TaglineList>
          <li>Add your songs.</li>
          <li>Access from any device.</li>
          <li>Scroll along.</li>
          <li>Transpose.</li>
          <li>Create playlists.</li>
        </TaglineList>

        <LoginButtonWrapper backgroundUrl={backgroundUrl}>
          <LoginTagline>
            100% free. <span>Get started now!</span>
          </LoginTagline>
          <LoginButtons />
        </LoginButtonWrapper>
      </LoginPageWrapper>
    )
  }
}
const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth && auth.user,
})
export default connect(mapStateToProps)(Landing)
