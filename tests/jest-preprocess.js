const babelOptions = {
  presets: ['babel-preset-gatsby'],
  plugins: ['babel-plugin-remove-graphql-queries'],
}

module.exports = require('babel-jest').createTransformer(babelOptions)
