import React from 'react'

import { Item, Label } from 'semantic-ui-react'

import AddToCart from '../AddToCart'

export default ({ id, image, name, meta, sku }) => (
  <Item.Group>
    <Item>
      <Item.Image size="medium" src={image} />

      <Item.Content>
        <Item.Header>{name}</Item.Header>
        <Item.Description>
          <p>{meta.display_price.with_tax.formatted}</p>

          <Label>SKU: {sku}</Label>
        </Item.Description>
        <Item.Extra>
          <AddToCart productId={id} />
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
)
