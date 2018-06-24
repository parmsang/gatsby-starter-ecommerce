import React from 'react'
import Link from 'gatsby-link'
import { Segment, Container, Grid, List, Header } from 'semantic-ui-react'
import styled from 'styled-components'

const StyledLink = styled.a`
  &&&&& {
    color: #2a5886;
    &:hover {
      text-decoration: underline;
    }
  }
`

const StyledListItem = styled(List.Item)`
  &&&&& {
    color: #2a5886;
    &:hover {
      text-decoration: underline;
    }
  }
`

const StyledGatsbyLink = styled(Link)`
  &&&&& {
    color: #2a5886;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Footer = () => (
  <div>
    <Segment
      vertical
      style={{
        padding: '4em 0em',
        marginTop: '3em',
        borderTop: '1px solid #f2f2f2',
      }}
    >
      <Container text>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header as="h4" content="About" />
              <List>
                <List.Item as={StyledGatsbyLink} to="/privacy/">
                  Privacy
                </List.Item>
                <StyledListItem as={Link} to="/terms/">
                  Terms
                </StyledListItem>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as="h4" content="Services" />
              <List>
                <StyledListItem as={Link} to="/">
                  Our Products
                </StyledListItem>
                <StyledListItem as={Link} to="/gatsbyimage/">
                  Gatsby Image Example
                </StyledListItem>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4">Footer Header</Header>
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
              <List horizontal>
                <List.Item
                  icon="twitter"
                  content={
                    <StyledLink
                      href="https://twitter.com/parmsang"
                      alt="twitter link"
                    >
                      Twitter
                    </StyledLink>
                  }
                />
                <List.Item
                  icon="facebook"
                  content={
                    <StyledLink
                      href="https://facebook.com/"
                      alt="facebook link"
                    >
                      Facebook
                    </StyledLink>
                  }
                />
                <List.Item
                  icon="mail"
                  content={
                    <StyledLink href="#" alt="email link">
                      Email
                    </StyledLink>
                  }
                />
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </div>
)

export default Footer
