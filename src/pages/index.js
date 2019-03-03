/* eslint-disable */

import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Image, Header } from 'semantic-ui-react'
import Helmet from 'react-helmet'
import ProductList from '../components/ProductList'
import logo from '../images/ill-short-dark.svg'
import Layout from '../components/Layout'

class StoreIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const products = get(this, 'props.data.allMoltinProduct.edges')
    const filterProductsWithoutImages = products.filter(
      v => v.node.includedData.main_image
    )
    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Header as="h3" icon textAlign="center" style={{ marginBottom: '2em' }}>
          <Header.Content style={{ width: '60%', margin: '0 auto' }}>
            <Image src={logo} alt={'logo'} />
          </Header.Content>
        </Header>
        <ProductList products={filterProductsWithoutImages} />
      </Layout>
    )
  }
}

export default StoreIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMoltinProduct {
      edges {
        node {
          originalId
          name
          description
          background_colour
          new
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
              id
              link {
                href
              }
            }
          }
          mainImage {
            childImageSharp {
              sizes(maxWidth: 600) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`
