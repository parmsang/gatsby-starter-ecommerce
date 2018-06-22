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
          <Item.Header>
            <Link to={`/product/${product_id}`}>{name}</Link>
          </Item.Header>
        ),
        image: (
          <Item.Image
            src={imageUrl}
            alt={name}
            size="small"
            style={{ background: '#f2f2f2' }}
          />
        ),
        meta: `${quantity}x ${price}`,
        description: 'Some more information goes here....',
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
