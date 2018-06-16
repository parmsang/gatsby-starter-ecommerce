import React from 'react'
import { Card } from 'semantic-ui-react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'

const mapProductsToItems = products =>
  products.map(({ node: { name, originalId, meta, mainImage } }) => {
    const price = meta.display_price.with_tax.formatted || null
    return {
      as: Link,
      to: `/product/${originalId}`,
      childKey: originalId,
      image: <Img sizes={mainImage.childImageSharp.sizes} alt={name} />,
      header: name,
      meta: price,
    }
  })

export default ({ products }) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} stackable />
)
