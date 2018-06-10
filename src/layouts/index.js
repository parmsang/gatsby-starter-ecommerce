import React from 'react'
import { Container } from 'semantic-ui-react'
import Headroom from 'react-headroom'
import 'semantic-ui-css/semantic.min.css'
import AuthContext from '../Auth/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Layout extends React.PureComponent {
  state = {
    token: null,
  }

  componentDidMount() {
    const token = localStorage.getItem('customerToken')

    const cartId = localStorage.getItem('mcart')

    if (!cartId) {
      const cartId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
      localStorage.setItem('mcart', cartId)
    }

    this.setState({
      token,
      cartId,
    })
  }

  render() {
    const { location, children } = this.props

    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          updateToken: () =>
            this.setState({
              token: localStorage.getItem('mcart'),
            }),
        }}
      >
        <React.Fragment>
          <Headroom>
            <Header location={location} token={this.state.token} />
          </Headroom>
          <Container text style={{ paddingTop: '2em' }}>
            {children()}
          </Container>
          <Footer />
        </React.Fragment>
      </AuthContext.Provider>
    )
  }
}

export default Layout
