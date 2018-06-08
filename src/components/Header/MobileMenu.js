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

class MobileMenu extends Component {
  state = { open: false }

  handleClick = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })

  render() {
    const { open } = this.state
    const { token } = this.props

    return (
      <Menu size="huge" borderless>
        <Container text>
          <Menu.Item as={Link} to="/" header>
            <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
            Starter Store
          </Menu.Item>
          <Menu.Item position="right" onClick={this.handleClick}>
            <Icon name="bars" />
          </Menu.Item>
          <Portal onClose={this.handleClose} open={open}>
            <Segment
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
                  circular
                  icon="x"
                  size="large"
                  style={{
                    position: 'absolute',
                    top: '-5em',
                    right: '0',
                    background: '#fff',
                  }}
                  onClick={this.handleClose}
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
