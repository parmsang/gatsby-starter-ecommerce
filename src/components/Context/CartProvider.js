import React, { Component } from 'react'
import CartContext from './CartContext'

class CartProvider extends Component {
  constructor(props) {
    super(props)

    this.addToCart = (quantity, cartId) => {
      const cartCount = Number(this.state.cartCount) + Number(quantity)
      localStorage.setItem('mdata', JSON.stringify({ cartId, cartCount }))

      return this.setState(() => ({
        cartCount,
      }))
    }

    this.updateCartCount = (cartCount, cartId) => {
      localStorage.setItem('mdata', JSON.stringify({ cartId, cartCount }))

      this.setState(() => ({
        cartCount,
      }))
    }

    this.state = {
      cartId: null,
      cartCount: 0,
      addToCart: this.addToCart,
      updateCartCount: this.updateCartCount,
    }
  }

  componentDidMount() {
    const cartId = localStorage.getItem('mcart')

    // Note: Instead of localStorage you can use moltin api & Moltin.getCartItems(cartId) instead
    const mdata = localStorage.getItem('mdata')

    if ((cartId && !mdata) || !cartId) {
      const cartId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      )
      localStorage.setItem('mcart', cartId)
      localStorage.setItem('mdata', JSON.stringify({ cartId, cartCount: 0 }))
      this.setState({
        cartId,
      })
    } else {
      const data = localStorage.getItem('mdata')
      const parsedData = JSON.parse(data)
      this.setState({
        cartCount: parsedData.cartCount || 0,
      })
    }
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    )
  }
}

export default CartProvider
