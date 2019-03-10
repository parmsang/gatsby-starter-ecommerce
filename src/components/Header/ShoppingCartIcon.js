/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react'
import {Icon} from 'semantic-ui-react'

const ShoppingCartIcon = ({cartCount, name}) => {
  const showCartCount = () => {
    if (!cartCount) {
      return `(0)`
    }
    if (cartCount > 9) {
      return (
        <span style={{fontSize: 'smaller'}}>
          9<sup>+</sup>
        </span>
      )
    }
    return `(${cartCount})`
  }
  return (
    <div>
      <Icon name="cart" />
      {` ${name} `}
      {showCartCount()}
    </div>
  )
}

export default ShoppingCartIcon
