import React, {useState, useContext} from 'react'
import {Input, Icon, Transition} from 'semantic-ui-react'
import CartContext from '../Context/CartContext'

const Moltin = require('../../../lib/moltin')

const AddToCart = ({productId}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [visible, setVisible] = useState(false)
  const {addToCart} = useContext(CartContext)

  const toggleMessage = () => {
    setTimeout(() => {
      setVisible(false)
    }, 1000)
  }

  const validate = quantity => {
    let error
    const re = /^[0-9\b]+$/

    if (!quantity) error = "Can't be blank"
    if (!re.test(quantity)) error = 'Please enter an integer for the quantity'

    return error
  }

  const handleSubmit = async () => {
    const cartId = await localStorage.getItem('mcart')

    const error = validate(quantity)
    setError(error)
    if (!error) {
      setLoading(true)
      Moltin.addToCart(cartId, productId, quantity)
        .then(() => {
          addToCart(quantity, cartId)
          setLoading(false)
          setQuantity(quantity)
          setVisible(true)
          toggleMessage()
        })
        .catch(err => {
          setError(`Error: ${err.errors[0].detail}` || 'Something went wrong')
          setLoading(false)
        })
    }
  }

  const handleChange = ({target: {value}}) => setQuantity(value)

  return (
    <>
      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        min={1}
        step={1}
        error={!!error}
        onChange={handleChange}
        action={{
          color: 'orange',
          content: 'Add to Cart',
          icon: 'plus cart',
          onClick: handleSubmit,
          loading,
          disabled: loading,
        }}
      />
      {error && <div style={{color: 'red', position: 'absolute'}}>{error}</div>}
      <Transition duration={{hide: 500, show: 500}} visible={visible}>
        <div style={{color: 'green', position: 'absolute'}}>
          <Icon name="check" />
          Added to cart
        </div>
      </Transition>
    </>
  )
}

export default AddToCart
