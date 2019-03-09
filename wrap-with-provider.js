import React from 'react'
import AuthProvider from './src/components/Context/AuthProvider'
import CartProvider from './src/components/Context/CartProvider'

// eslint-disable-next-line import/prefer-default-export
export default ({ element }) => (
  <AuthProvider>
    <CartProvider>{element}</CartProvider>
  </AuthProvider>
)
