/* eslint-disable camelcase */
import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'

const mapProductsToItems = products =>
  products.map(({node: {name, id, meta, mainImage, background_colour}}) => {
    const price = meta.display_price.with_tax.formatted || null
    return {
      as: Link,
      to: `/product/${id}/`,
      childKey: id,
      image: (
        <Image>
          <Img
            sizes={mainImage.childImageSharp.sizes}
            alt={name}
            style={{
              background: `${background_colour || '#fafafa'}`,
            }}
          />
        </Image>
      ),
      header: name,
      meta: <Card.Meta style={{color: 'dimgray'}}>{price}</Card.Meta>,
    }
  })

export default ({products}) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} stackable />
)
