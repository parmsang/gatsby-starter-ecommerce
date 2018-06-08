/* eslint-disable */
import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import ProductSummary from '../components/ProductSummary'
import ProductAttributes from '../components/ProductAttributes'

class ProductPageTemplate extends React.PureComponent {
  render() {
    const productInfo = get(this, 'props.data.allMoltinProduct')
    const data = productInfo.edges[0].node
    const slug = data.slug
    const product = {
      ...data,
      id: data.originalId,
      image: data.includedData.main_image.link.href,
      header: data.name,
      meta: data.meta,
      sku: data.sku,
    }

    return (
      <div>
        <Helmet title={slug} />
        <ProductSummary {...product} />
        <ProductAttributes {...product} />
      </div>
    )
  }
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductsQuery($originalId: String!) {
    allMoltinProduct(filter: { originalId: { eq: $originalId } }) {
      edges {
        node {
          originalId
          name
          description
          meta {
            display_price {
              with_tax {
                amount
                currency
                formatted
              }
            }
          }
          includedData {
            main_image {
              link {
                href
              }
            }
          }
          slug
          material
          max_watt
          bulb_qty
          bulb
          new
          sku
          finish
        }
      }
    }
  }
`
