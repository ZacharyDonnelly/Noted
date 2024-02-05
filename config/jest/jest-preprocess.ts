const babelJest = require('babel-jest') // ts-expect-error import/no-extraneous-dependencies

const babelOptions = {
  presets: ['@babel/preset-react', '@babel/preset-typescript']
}

module.exports = babelJest.default.createTransformer(babelOptions)
