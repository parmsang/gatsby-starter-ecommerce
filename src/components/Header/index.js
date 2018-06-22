import React from 'react'
import { Grid } from 'semantic-ui-react'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import AuthContext from '../Context/AuthContext'

class Header extends React.PureComponent {
  render() {
    return (
      <AuthContext.Consumer>
        {auth => (
          <Grid>
            <Grid.Row columns={1} only="mobile">
              <Grid.Column>
                <MobileMenu location={this.props.location} token={auth.token} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1} only="tablet computer">
              <Grid.Column>
                <DesktopMenu
                  location={this.props.location}
                  token={auth.token}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </AuthContext.Consumer>
    )
  }
}

export default Header
