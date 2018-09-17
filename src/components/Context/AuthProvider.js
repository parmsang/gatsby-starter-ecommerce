import React, { Component } from 'react'
import AuthContext from './AuthContext'

class AuthProvider extends Component {
  constructor(props) {
    super(props)

    this.updateToken = () =>
      this.setState({
        token: localStorage.getItem('customerToken'),
      })

    this.state = {
      token: null,
      updateToken: this.updateToken,
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('customerToken')

    this.setState({
      token,
    })
  }

  render() {
    const { token, updateToken } = this.state
    return (
      <AuthContext.Provider
        value={{
          token,
          updateToken,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthProvider
