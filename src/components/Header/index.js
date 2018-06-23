import React from 'react'
import { Grid, Segment, Responsive } from 'semantic-ui-react'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import AuthContext from '../Context/AuthContext'

class Header extends React.PureComponent {
  render() {
    return (
      <AuthContext.Consumer>
        {auth => (
          <React.Fragment>
            <Responsive {...Responsive.onlyMobile}>
              <MobileMenu location={this.props.location} token={auth.token} />
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <DesktopMenu location={this.props.location} token={auth.token} />
            </Responsive>
          </React.Fragment>
        )}
      </AuthContext.Consumer>
    )
  }
}

export default Header
