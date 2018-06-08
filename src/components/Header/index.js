import React from 'react'
import { Grid } from 'semantic-ui-react'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

class Header extends React.Component {
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
    return (
      <Grid>
        <Grid.Row columns={1} only="mobile">
          <Grid.Column>
            <MobileMenu token={this.state.token} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} only="tablet computer">
          <Grid.Column>
            <DesktopMenu
              location={this.props.location}
              token={this.state.token}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Header
