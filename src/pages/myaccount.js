import React, {useState, useEffect, useContext} from 'react'
import {navigate} from 'gatsby'
import SEO from '../components/SEO'
import OrderItemList from '../components/OrderItemList'
import Layout from '../components/Layout'
import AuthContext from '../components/Context/AuthContext'

import {getOrders} from '../../lib/moltin'

const MyAccount = ({location}) => {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [included, setIncluded] = useState([])
  const [meta, setMeta] = useState({})
  const {token} = useContext(AuthContext)

  useEffect(() => {
    if (!token) {
      navigate('/login/')
    }
    getOrders(token)
      .then(({data, meta, included}) => {
        const orders = data.map(order => ({
          ...order,
        }))
        setLoading(false)
        setMeta(meta)
        setOrders(orders)
        setIncluded(included)
      })
      .catch(error => {
        console.log(error)
      })
  }, [token])

  return (
    <Layout location={location}>
      <SEO title="My Account" />
      <OrderItemList
        meta={meta}
        orders={orders}
        loading={loading}
        included={included}
      />
    </Layout>
  )
}
export default MyAccount
