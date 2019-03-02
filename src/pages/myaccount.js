import React from 'react'
import { navigate } from 'gatsby'
import Helmet from 'react-helmet'
import OrderItemList from '../components/OrderItemList'
import Layout from '../components/Layout'

import { getOrders } from '../../lib/moltin'

export default class MyAccount extends React.Component {
  state = {
    loading: true,
    orders: [],
  }

  componentDidMount() {
    const token = localStorage.getItem('customerToken')

    if (!token) {
      navigate('/login/')
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
      <Layout location={this.props.location}>
        <Helmet title="My Account" />
        <OrderItemList {...this.state} />
      </Layout>
    )
  }
}
