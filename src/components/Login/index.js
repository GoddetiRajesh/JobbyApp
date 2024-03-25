import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken)
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <form onSubmit={this.onSubmitForm} className="login-container">
          <img
            className="web-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label htmlFor="username" className="username-label">
            USERNAME
          </label>
          <input
            onChange={this.updateUsername}
            id="username"
            type="text"
            className="username-input"
            placeholder="Username"
            value={username}
          />
          <label htmlFor="password" className="username-label">
            PASSWORD
          </label>
          <input
            onChange={this.updatePassword}
            id="password"
            type="password"
            className="username-input"
            placeholder="Password"
            value={password}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {errMsg !== '' && <p className="error-msg">{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
