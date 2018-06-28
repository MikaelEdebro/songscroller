import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const LandingWrapper = styled.div`
  text-align: center;
`
class Landing extends React.Component {
  componentDidMount() {
    console.log('Landing')
  }

  render() {
    return (
      <LandingWrapper>
        <h1>Welcome to Troubadour</h1>
        <p>Your solution for musicians</p>

        <p>
          {this.props.isAuthenticated ? (
            <a href="/api/auth/logout">Log out</a>
          ) : (
            <a href="/api/auth/google">Login with Google</a>
          )}
        </p>
      </LandingWrapper>
    )
  }
}
const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth,
})
export default connect(mapStateToProps)(Landing)
