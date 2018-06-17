import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
  Menu,
  Container,
  Image,
  Icon,
  Portal,
  Segment,
  Divider,
  Button,
} from 'semantic-ui-react'
import styled from 'styled-components'
import logo from '../../images/moltin-light-hex.svg.svg'

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
    const { token } = this.props

    return (
      <Menu size="huge" borderless pointing>
        <Container text>
          <Menu.Item as={Link} to="/" header active={activeItem === '/'}>
            <Image
              size="mini"
              src={logo}
              style={{ marginRight: '1.5em' }}
              alt="I love Lamp"
            />
            Starter Store
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/cart" active={activeItem === '/cart'}>
              <Icon name="cart" />
              Cart
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
            <Segment
              role="dialog"
              aria-label="Navigation Menu"
              style={{
                position: 'fixed',
                top: '0%',
                left: '0vw',
                zIndex: 1000,
                width: '100vw',
                height: '110vh',
              }}
            >
              <div
                style={{
                  marginTop: '6em',
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <Button
                  aria-label="Close Navigation"
                  circular
                  icon="x"
                  size="large"
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
                  <Icon name="home" style={{ marginRight: '0.5em' }} />
                  Home
                </StyledLink>
                <Divider />
                <StyledLink to="/cart" onClick={this.handleClose}>
                  <Icon name="cart" style={{ marginRight: '0.5em' }} />
                  Shopping Cart
                </StyledLink>
                <Divider />
                {token ? (
                  <StyledLink to="/myaccount" onClick={this.handleClose}>
                    <Icon name="user" style={{ marginRight: '0.5em' }} />
                    My Account
                  </StyledLink>
                ) : (
                  [
                    <StyledLink
                      to="/register"
                      onClick={this.handleClose}
                      key={1}
                    >
                      <Icon name="signup" style={{ marginRight: '0.5em' }} />
                      Sign Up
                    </StyledLink>,
                    <Divider key={2} />,
                    <StyledLink to="/login" onClick={this.handleClose} key={3}>
                      <Icon name="sign in" style={{ marginRight: '0.5em' }} />
                      Sign In
                    </StyledLink>,
                  ]
                )}
              </div>
            </Segment>
          </Portal>
        </Container>
      </Menu>
    )
  }
}

export default MobileMenu
