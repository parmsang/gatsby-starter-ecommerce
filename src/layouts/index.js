import React from 'react'
import { Container } from 'semantic-ui-react'
import Headroom from 'react-headroom'
import Helmet from 'react-helmet'
import 'semantic-ui-css/semantic.min.css'
import AuthProvider from '../components/Context/AuthProvider'
import Header from '../components/Header'
import Footer from '../components/Footer'
import favicon from './favicon.ico'

class Layout extends React.PureComponent {
  componentDidMount() {
    const cartId = localStorage.getItem('mcart')

    if (!cartId) {
      const cartId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
      localStorage.setItem('mcart', cartId)
    }
  }

  render() {
    const { location, children } = this.props

    return (
      <AuthProvider>
        <Helmet>
          <html lang="en" />
          <meta
            name="description"
            content="A starter eCommerce website made using GatsbyJS"
          />
          <link rel="shortcut icon" href={favicon} />
        </Helmet>
        <Headroom upTolerance={10} downTolerance={10} style={{ zIndex: '20' }}>
          <Header location={location} />
        </Headroom>
        <Container text style={{ paddingTop: '2em' }}>
          {children()}
        </Container>
        <Footer />
      </AuthProvider>
    )
  }
}

export default Layout
