import React from 'react'
import { Container } from 'semantic-ui-react'
import Headroom from 'react-headroom'
import 'semantic-ui-css/semantic.min.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Template extends React.PureComponent {
  render() {
    const { location, children, data } = this.props

    return (
      <div>
        <Headroom>
          <Header location={location} data={data} />
        </Headroom>
        <Container text style={{ paddingTop: '2em' }}>
          {children()}
        </Container>
        <Footer />
      </div>
    )
  }
}

export default Template
