const crypto = require('crypto')

const MoltinGateway = require(`@moltin/sdk`).gateway

const fromPairs = pairs =>
  pairs.reduce((cache, pair) => {
    cache[pair[0]] = pair[1]
    return cache
  }, {})

exports.sourceNodes = async (
  { boundActionCreators, createNodeId },
  configOptions
) => {
  const { createNode } = boundActionCreators

  delete configOptions.plugins

  const processProduct = ({ included, product, options }) => {
    const nodeId = createNodeId(`moltin-product-${product.id}`)
    const nodeContent = JSON.stringify(product)
    const nodeContentDigest = crypto
      .createHash('md5')
      .update(nodeContent)
      .digest('hex')

    const nodeData = Object.assign({}, product, {
      id: nodeId,
      originalId: product.id,
      included,
      includedData: { ...options },
      parent: null,
      children: [],
      internal: {
        type: `MoltinProduct`,
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    })

    return nodeData
  }
  const products = await MoltinGateway({
    client_id: configOptions.key,
  })
    .Products.With(configOptions.products)
    .All()

  const mapProductToConfigOptions = [
    ['main_image', 'main_images'],
    ['files', 'files'],
    ['categories', 'categories'],
    ['brands', 'brands'],
  ].filter(([configName]) => configOptions.products.includes(configName))

  const productWithIncludedData = ({
    configType,
    productRelationships: { data: relationships },
    includedData,
  }) =>
    relationships.id
      ? [configType, includedData.find(v => relationships.id === v.id)]
      : [
          configType,
          relationships.map(v => includedData.find(i => v.id === i.id)),
        ]

  const joinOnRelationships = (product, included) =>
    fromPairs(
      mapProductToConfigOptions
        .map(([configType, productType]) => ({
          configType,
          productRelationships: product.relationships[configType],
          includedData: included[productType],
        }))
        .filter(
          ({ productRelationships, includedData }) =>
            productRelationships && includedData
        )
        .map(productWithIncludedData)
    )

  products.data.forEach(product => {
    const { included } = products
    const options = joinOnRelationships(product, included)
    const nodeData = processProduct({ included, product, options })
    createNode(nodeData)
  })
}
