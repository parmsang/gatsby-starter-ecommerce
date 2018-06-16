import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Menu, Container, Icon, Image } from 'semantic-ui-react'
import logo from '../../images/moltin-light-hex.svg.svg'

class DesktopMenu extends Component {
  state = { activeItem: '/' }

  componentWillReceiveProps(nextProps) {
    const nextPathname = nextProps.location.pathname
    const currentPathname = this.props.location.pathname
    if (nextPathname !== currentPathname) {
      this.setState({ activeItem: nextPathname })
    }
  }

  render() {
    const { activeItem } = this.state
    const { token } = this.props

    return (
      <Menu size="huge" borderless pointing>
        <Container text>
          <Menu.Item active={activeItem === '/'} as={Link} to="/" header>
            <Image
              size="mini"
              src={logo}
              style={{ marginRight: '1.5em' }}
              alt="I love Lamp"
            />
            Starter Store
          </Menu.Item>

          {token ? (
            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to="/myaccount"
                active={activeItem === '/myaccount'}
              >
                <Icon name="user" />
                My Account
              </Menu.Item>
              <Menu.Item as={Link} to="/cart" active={activeItem === '/cart'}>
                <Icon name="cart" />
                Cart
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to="/register"
                active={activeItem === '/register'}
              >
                Sign up
              </Menu.Item>
              <Menu.Item as={Link} to="/login" active={activeItem === '/login'}>
                Sign in
              </Menu.Item>
              <Menu.Item as={Link} to="/cart" active={activeItem === '/cart'}>
                <Icon name="cart" />
                Cart
              </Menu.Item>
            </Menu.Menu>
          )}
        </Container>
      </Menu>
    )
  }
}

export default DesktopMenu
