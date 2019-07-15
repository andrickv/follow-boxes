const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [
    path.resolve(__dirname, './src/index.js'),
    require.resolve('webpack-dev-server/client'),
  ],
  output: {
    path: path.resolve(__dirname, './pubic'),
    filename: 'bundle.js',
  },
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-eval-source-map' : 'source-map',
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    overlay: true,
  },
  plugins: [new webpack.EnvironmentPlugin(process.env)],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
