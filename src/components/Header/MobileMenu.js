import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
  Menu,
  Container,
  Icon,
  Portal,
  Segment,
  Divider,
  Button,
} from 'semantic-ui-react'
import styled from 'styled-components'
import ShoppingCartIcon from './ShoppingCartIcon'
import Logo from './Logo'

const StyledLink = styled(Link)`
  color: black;
  font-weight: bold;
  text-align: center;
  font-size: 2em;
  &:hover {
    text-decoration: underline;
  }
`

const StyledNavButton = styled(Button)`
  &:focus {
    outline: -webkit-focus-ring-color auto 5px;
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
    outline-width: 5px;
  }
`
const StyledSegment = styled(Segment)`
  &&& {
    position: fixed;
    top: 0%;
    left: 0vw;
    z-index: 1000;
    width: 100vw;
    height: 110vh;
  }
`

const StyledContainer = styled.div`
  &&& {
    margin-top: 6em;
    text-align: center;
    position: relative;
  }
`

const StyledDivider = styled(Divider)`
  &&& {
    margin: 2em;
  }
`

class MobileMenu extends Component {
  state = { open: false, activeItem: '/' }

  componentWillReceiveProps(nextProps) {
    const nextPathname = nextProps.location.pathname
    const currentPathname = this.props.location.pathname

    if (nextPathname !== currentPathname) {
      this.setState({
        activeItem: `/${nextPathname
          .split('/')
          .pop()
          .toString()}`,
      })
    }
  }

  handleClick = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })

  render() {
    const { open, activeItem } = this.state
    const { token, cartCount } = this.props

    return (
      <Menu size="huge" borderless pointing>
        <Container text>
          <Menu.Item as={Link} to="/" header active={activeItem === '/'}>
            <Logo />
            Starter Store
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/cart" active={activeItem === '/cart'}>
              <ShoppingCartIcon cartCount={cartCount} name="Cart" />{' '}
            </Menu.Item>
            <Menu.Item position="right">
              <StyledNavButton
                basic
                onClick={this.handleClick}
                aria-label="Open Navigation Menu"
              >
                <Icon fitted name="bars" />
              </StyledNavButton>
            </Menu.Item>
          </Menu.Menu>
          <Portal closeOnEscape onClose={this.handleClose} open={open}>
            <StyledSegment className role="dialog" aria-label="Navigation Menu">
              <StyledContainer>
                <Button
                  aria-label="Close Navigation"
                  circular
                  icon="x"
                  basic
                  style={{
                    position: 'absolute',
                    top: '-5em',
                    right: '0',
                  }}
                  onClick={this.handleClose}
                  autoFocus
                />
                <StyledLink to="/" onClick={this.handleClose}>
                  Home
                </StyledLink>
                <StyledDivider />
                <StyledLink to="/cart" onClick={this.handleClose}>
                  Shopping Cart
                </StyledLink>
                <StyledDivider />
                {token ? (
                  <StyledLink to="/myaccount" onClick={this.handleClose}>
                    My Account
                  </StyledLink>
                ) : (
                  [
                    <StyledLink
                      to="/register"
                      onClick={this.handleClose}
                      key={1}
                    >
                      Sign Up
                    </StyledLink>,
                    <StyledDivider key={2} />,
                    <StyledLink to="/login" onClick={this.handleClose} key={3}>
                      Sign In
                    </StyledLink>,
                  ]
                )}
              </StyledContainer>
            </StyledSegment>
          </Portal>
        </Container>
      </Menu>
    )
  }
}

export default MobileMenu
