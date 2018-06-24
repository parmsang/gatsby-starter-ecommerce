import React, { Component } from 'react'
import Link, { withPrefix } from 'gatsby-link'
import { Menu, Container, Icon } from 'semantic-ui-react'
import ShoppingCartIcon from './ShoppingCartIcon'
import Logo from './Logo'

class DesktopMenu extends Component {
  state = {
    activeItem: this.props.location.pathname,
  }

  componentWillReceiveProps(nextProps) {
    const nextPathname = nextProps.location.pathname
    const currentPathname = this.props.location.pathname

    if (nextPathname !== currentPathname) {
      this.setState({
        activeItem: nextPathname,
      })
    }
  }

  render() {
    const { activeItem } = this.state
    const { token, cartCount } = this.props
    return (
      <Menu size="huge" borderless pointing>
        <Container text>
          <Menu.Item
            active={activeItem === withPrefix('/')}
            as={Link}
            to="/"
            header
          >
            <Logo />
            Starter Store
          </Menu.Item>
          {token ? (
            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to="/myaccount/"
                active={activeItem === withPrefix('/myaccount/')}
              >
                <Icon name="user" />
                My Account
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/cart/"
                active={activeItem === withPrefix('/cart/')}
              >
                <ShoppingCartIcon cartCount={cartCount} name="Cart" />
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to="/register/"
                active={activeItem === withPrefix('/register/')}
              >
                Sign up
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/login/"
                active={activeItem === withPrefix('/login/')}
              >
                Sign in
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/cart/"
                active={activeItem === withPrefix('/cart/')}
              >
                <ShoppingCartIcon cartCount={cartCount} name="Cart" />
              </Menu.Item>
            </Menu.Menu>
          )}
        </Container>
      </Menu>
    )
  }
}

export default DesktopMenu
