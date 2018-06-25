const Promise = require('bluebird')
const path = require('path')
const get = require('lodash/get')

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve('src/templates/ProductPage.js')
    resolve(
      graphql(
        `
          {
            allMoltinProduct {
              edges {
                node {
                  originalId
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.allMoltinProduct.edges.forEach(edge => {
          createPage({
            path: `/product/${edge.node.originalId}/`,
            component: productPageTemplate,
            context: {
              originalId: edge.node.originalId,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = async ({ node, boundActionCreators, cache, store }) => {
  const { createNode } = boundActionCreators
  let fileNode

  if (node.internal && node.internal.type === `MoltinProduct`) {
    const mainImageHref = get(node, 'includedData.main_image.link.href')

    fileNode = await createRemoteFileNode({
      url: mainImageHref,
      store,
      cache,
      createNode,
    })
    if (fileNode && fileNode.id) node.mainImage___NODE = fileNode.id
  }
}

exports.modifyWebpackConfig = ({ config }) => {
  config.merge({
    node: { fs: 'empty' },
  })

  return config
}
