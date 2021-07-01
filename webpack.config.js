const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  target: 'web',
  context: `${__dirname}/src`,
  entry: {
    background: './background',
  },
  output: {
    path: `${__dirname}/app/`,
    filename: '[name].js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        'icon.png',
        {
          from: 'manifest.json',
          transform: (content) => {
            return Buffer.from(
              JSON.stringify({
                ...JSON.parse(content.toString()),
                name: process.env.npm_package_productName,
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
              })
            )
          },
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '~~': `${__dirname}/`,
      '~': `${__dirname}/src/`,
    },
  },
}
