import React from 'react'
import {Container} from 'semantic-ui-react'
import Headroom from 'react-headroom'
import 'semantic-ui-css/semantic.min.css'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({location, children}) => (
  <>
    <Headroom
      upTolerance={10}
      downTolerance={10}
      style={{zIndex: '20', height: '6.5em'}}
    >
      <Header location={location} />
    </Headroom>
    <Container text>{children}</Container>
    <Footer />
  </>
)

export default Layout
