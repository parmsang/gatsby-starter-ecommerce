import React, {useState, useEffect} from 'react'
import {Link, withPrefix} from 'gatsby'
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
  font-weight: bold;
  text-align: center;
  font-size: 2em;
  &:hover {
    text-decoration: underline;
  }
`

const BurgerButton = styled(Button)`
  &&& {
    font-size: 1rem;
    padding: 0.785em 1.5em;
    box-shadow: 0 0 0 1px transparent inset,
      0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  }
`
const CloseButton = styled(BurgerButton)`
  &&& {
    position: absolute;
    top: -4em;
    right: 0em;
    padding: 0.5em;
    font-size: 1.5em;
    width: 2em;
    height: 2em;
  }
`

const StyledSegment = styled(Segment)`
  &&& {
    position: fixed;
    top: -1em;
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

const MobileMenu = ({location: {pathname}, token, cartCount, signout}) => {
  const [activeItem, setActiveItem] = useState(pathname)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])

  const handleClick = () => setOpen(!open)

  const handleClose = () => setOpen(false)

  return (
    <Menu size="huge" borderless pointing>
      <Container text>
        <Menu.Item
          as={Link}
          to="/"
          header
          active={activeItem === withPrefix('/')}
        >
          <Logo />
          Store
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/cart/"
            active={activeItem === withPrefix('/cart/')}
          >
            <ShoppingCartIcon cartCount={cartCount} name="" />
          </Menu.Item>
          <Menu.Item position="right">
            <BurgerButton
              basic
              onClick={handleClick}
              aria-label="Open Navigation Menu"
              autoFocus
            >
              <Icon fitted name="bars" />
            </BurgerButton>
          </Menu.Item>
        </Menu.Menu>
        <Portal closeOnEscape onClose={handleClose} open={open}>
          <StyledSegment className role="dialog" aria-label="Navigation Menu">
            <StyledContainer>
              <CloseButton
                aria-label="Close Navigation"
                basic
                circular
                onClick={handleClose}
                autoFocus
              >
                X
              </CloseButton>
              <StyledLink to="/" onClick={handleClose}>
                Home
              </StyledLink>
              <StyledDivider />
              <StyledLink to="/cart/" onClick={handleClose}>
                {`Shopping Cart ${cartCount ? `(${cartCount})` : ''}`}
              </StyledLink>
              <StyledDivider />
              {token
                ? [
                    <StyledLink to="/myaccount/" onClick={handleClose} key={1}>
                      My Account
                    </StyledLink>,
                    <StyledDivider key={2} />,
                    <StyledLink to="/" onClick={signout} key={3}>
                      Sign out
                    </StyledLink>,
                  ]
                : [
                    <StyledLink to="/register/" onClick={handleClose} key={1}>
                      Sign Up
                    </StyledLink>,
                    <StyledDivider key={2} />,
                    <StyledLink to="/login/" onClick={handleClose} key={3}>
                      Sign In
                    </StyledLink>,
                  ]}
            </StyledContainer>
          </StyledSegment>
        </Portal>
      </Container>
    </Menu>
  )
}

export default MobileMenu
