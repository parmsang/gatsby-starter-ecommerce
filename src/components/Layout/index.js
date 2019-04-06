import React from 'react'
import Headroom from 'react-headroom'
import {Container} from 'semantic-ui-react'
import Footer from '../Footer'
import Header from '../Header'
import 'semantic-ui-css/semantic.min.css'

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
