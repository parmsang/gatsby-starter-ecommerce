// require('regenerator-runtime/runtime')

const MoltinGateway = require(`@moltin/sdk`).gateway

const Moltin = MoltinGateway({
  client_id:
    process.env.MOLTIN_CLIENT_ID ||
    'j6hSilXRQfxKohTndUuVrErLcSJWP15P347L6Im0M4',
})

const getProducts = () => Moltin.Products.With('main_image').All()

const getProductById = id => Moltin.Products.With('main_image').Get(id)

const addToCart = (cartId, productId, quantity) =>
  Moltin.Cart(cartId).AddProduct(productId, quantity)

const getCartItems = id => Moltin.Cart(id).Items()

const removeFromCart = (productId, cartId) =>
  Moltin.Cart(cartId).RemoveItem(productId)

const checkoutCart = (cartId, customer, billing) =>
  Moltin.Cart(cartId).Checkout(customer, billing)

const payForOrder = (orderId, token, email) =>
  Moltin.Orders.Payment(orderId, {
    gateway: 'stripe',
    method: 'purchase',
    payment: token,
    options: {
      receipt_email: email,
    },
  })

const login = ({ email, password }) =>
  Moltin.Customers.Token(email, password).then(data => {
    const {
      data: { customer_id: id, token },
    } = data
    return {
      id,
      token,
    }
  })

const register = ({ email, password, ...rest }) =>
  Moltin.Customers.Create({
    email,
    password,
    type: 'customer',
    ...rest,
  }).then(data => {
    const {
      data: { name, id },
    } = data
    return login({ email, password }).then(data => {
      const { token } = data
      return {
        id,
        name,
        email,
        token,
      }
    })
  })

const getOrders = token => Moltin.Orders.With('items').All(token)

module.exports = {
  getProducts,
  getProductById,
  addToCart,
  getCartItems,
  removeFromCart,
  checkoutCart,
  payForOrder,
  register,
  login,
  getOrders,
}
