import React from 'react'
import Helmet from 'react-helmet'
import CartItemList from '../components/CartItemList/'
import CartSummary from '../components/CartSummary/'
import CartContext from '../components/Context/CartContext'

const Moltin = require('../../lib/moltin')

export default class Cart extends React.Component {
  state = {
    items: [],
    loading: true,
    completed: false,
  }

  componentDidMount() {
    const cartId = localStorage.getItem('mcart')
    Moltin.getCartItems(cartId).then(({ data, meta }) => {
      this.setState({
        items: data,
        meta,
        cartId,
        loading: false,
      })
    })
  }

  _handleCheckout = data => {
    const cartId = localStorage.getItem('mcart')
    const customerId = localStorage.getItem('mcustomer')

    const {
      id: token,
      email,
      card: {
        name,
        address_line1: line_1,
        address_city: city,
        address_country: country,
        address_state: county,
        address_zip: postcode,
      },
    } = data

    const customer = { name, email } // token ? customerId : { name, email };

    const address = {
      first_name: name.split(' ')[0],
      last_name: name.split(' ')[1],
      line_1,
      city,
      county,
      country,
      postcode,
    }

    Moltin.checkoutCart(cartId, customer, address)
      .then(({ data: { id } }) => {
        Moltin.payForOrder(id, token, email)
        this.setState({
          completed: true,
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  _handleRemoveFromCart = (itemId, context) => {
    const { cartId } = this.state
    Moltin.removeFromCart(itemId, cartId).then(({ data, meta }) => {
      const total = data.reduce((a, c) => a + c.quantity, 0)
      context.updateCartCount(total, cartId)
      this.setState({
        items: data,
        meta,
      })
    })
  }

  render() {
    const { meta, ...rest } = this.state
    const { loading } = rest
    return (
      <div>
        <Helmet title="Cart" />
        <CartContext.Consumer>
          {context => (
            <CartItemList
              {...rest}
              removeFromCart={item => this._handleRemoveFromCart(item, context)}
            />
          )}
        </CartContext.Consumer>
        {!loading &&
          !rest.completed && (
            <CartSummary {...meta} handleCheckout={this._handleCheckout} />
          )}
      </div>
    )
  }
}
