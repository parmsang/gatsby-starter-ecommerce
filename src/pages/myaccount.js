import React from 'react'
import { navigateTo } from 'gatsby-link'
import Helmet from 'react-helmet'
import OrderItemList from '../components/OrderItemList'

import { getOrders } from '../../lib/moltin'

export default class MyAccount extends React.Component {
  state = {
    loading: true,
    orders: [],
  }

  componentDidMount() {
    const token = localStorage.getItem('customerToken')

    if (!token) {
      navigateTo('/login')
    }
    getOrders(token)
      .then(({ data, included, meta }) => {
        const orders = data.map(order =>
          // const orderItems = order.relationships.items.data
          // const includedItems = included.items.map(i => i.id === )

          ({
            ...order,
          })
        )

        this.setState({
          loading: false,
          orders,
          included,
          meta,
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <Helmet title="My Account" />
        <OrderItemList {...this.state} />
      </div>
    )
  }
}
