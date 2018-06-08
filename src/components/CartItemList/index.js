import React from 'react'
import Link from 'gatsby-link'
import { Item, Button, Loader, Message } from 'semantic-ui-react'

export default ({ items, removeFromCart, loading, completed }) => {
  if (loading) return <Loader active inline="centered" />

  if (completed)
    return (
      <Message success>
        <Message.Header>Your placed!</Message.Header>
        <p>Congratulations. Your order and payment has been accepted.</p>
      </Message>
    )

  if (items.length === 0)
    return (
      <Message warning>
        <Message.Header>Your cart is empty</Message.Header>
        <p>
          You'll need to add some items to the cart before you can checkout.
        </p>
      </Message>
    )
  const mapCartItemsToItems = items =>
    items.map(({ id, product_id, name, quantity, meta, image }) => {
      const price = meta.display_price.with_tax.unit.formatted || ''
      const imageUrl = image.href || '/static/moltin-light-hex.svg'
      return {
        childKey: id,
        header: (
          <Link to={`/product/${product_id}`}>
            <Item.Header>{name}</Item.Header>
          </Link>
        ),
        image: imageUrl,
        meta: `${quantity}x ${price}`,
        extra: (
          <Button
            basic
            icon="remove"
            floated="right"
            onClick={() => removeFromCart(id)}
          />
        ),
      }
    })
  return <Item.Group divided items={mapCartItemsToItems(items)} />
}
