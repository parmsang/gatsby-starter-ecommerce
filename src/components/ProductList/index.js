import React from 'react'
import { Card } from 'semantic-ui-react'
import Link from 'gatsby-link'

const mapProductsToItems = products =>
  products.map(({ node: { name, originalId, meta, includedData } }) => {
    const image = includedData.main_image.link.href
    const price = meta.display_price.with_tax.formatted || null
    return {
      as: Link,
      to: `/product/${originalId}`,
      childKey: originalId,
      image,
      header: name,
      meta: price,
    }
  })

export default ({ products }) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} stackable />
)
