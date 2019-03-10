import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import Helmet from 'react-helmet'
import OrderItemList from '../components/OrderItemList'
import Layout from '../components/Layout'

import { getOrders } from '../../lib/moltin'

const MyAccount = ({ location }) => {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [meta, setMeta] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('customerToken')
    if (!token) {
      navigate('/login/')
    }
    getOrders(token)
      .then(({ data, meta }) => {
        const orders = data.map(order =>
          // const orderItems = order.relationships.items.data
          // const includedItems = included.items.map(i => i.id === )
          ({
            ...order,
          })
        )
        setLoading(false)
        setMeta(meta)
        setOrders(orders)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Layout location={location}>
      <Helmet title="My Account" />
      <OrderItemList meta={meta} orders={orders} loading={loading} />
    </Layout>
  )
}
export default MyAccount
