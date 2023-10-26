import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userId: '', PIN: '', showErrorMsg: false, errorMsg: ''}

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, PIN} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const data = {user_id: userId, pin: PIN}
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const {history} = this.props

      Cookies.set('jwt_token', fetchedData.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({showErrorMsg: true, errorMsg: fetchedData.error_msg})
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePIN = event => {
    this.setState({PIN: event.target.value})
  }

  render() {
    const {userId, PIN, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="inner-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-img"
          />
          <div className="form-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="form-heading">Welcome Back!</h1>
              <label htmlFor="input-1" className="label">
                User ID
              </label>
              <br />
              <input
                value={userId}
                placeholder="Enter User ID"
                type="text"
                className="input-element"
                id="input-1"
                onChange={this.onChangeUserId}
              />
              <br />
              <label htmlFor="input-2" className="label">
                PIN
              </label>
              <br />
              <input
                value={PIN}
                placeholder="Enter PIN"
                type="password"
                className="input-element"
                id="input-2"
                onChange={this.onChangePIN}
              />
              <br />
              <button type="submit" className="login-button">
                Login
              </button>
              {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
