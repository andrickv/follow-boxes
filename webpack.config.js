const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const checkProdMode = () => {
  const args = process.argv.slice(2);
  return args.find(a => a.indexOf('-p') !== -1);
};

if (checkProdMode()) {
  process.env.NODE_ENV = 'production';
} else {
  process.env.NODE_ENV = 'development';
}

const loadGameSettings = () => {
  const settings = require('./gameSettings.json');
  Object.keys(settings).forEach((k) => {
    process.env[k] = settings[k];
  });
};

loadGameSettings();

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
  plugins: [
    new webpack.EnvironmentPlugin(process.env),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[hash].css',
      chunkFilename: process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: process.env.NODE_ENV === 'development',
              includePaths: [
                path.resolve(
                  __dirname,
                  './src/containers/App/style/',
                ),
              ],
            },
          },
        ],
      },
    ],
  },
};
