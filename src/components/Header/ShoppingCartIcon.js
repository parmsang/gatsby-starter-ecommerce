import React from 'react'
import { Icon } from 'semantic-ui-react'

const ShoppingCartIcon = ({ name }) => (
  <React.Fragment>
    <Icon name="cart" />
    {` ${name}`}
  </React.Fragment>
)

export default ShoppingCartIcon
