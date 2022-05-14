const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const LodashPlugin = require('lodash-webpack-plugin');
const port = process.env.PORT || 3001;
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {index: path.resolve(__dirname, 'src', 'index.js')},
  output: {
    filename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),

    /* Specify the base path for all the assets within the app
     * If removed, nested routes(/a/b/c/d) will make the browser
     * look for assets in '/a' instead of '/' where it is
     * actually stored,
     */
    publicPath: '/',
  },
  devServer: {
    hot: true,
    port: port,
    historyApiFallback: true,  // or this will appear: CANNOT GET /route
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: path.resolve(__dirname, 'src', 'index.html'),
      title: 'Tiger Console',
    }),
    new LodashPlugin({
      paths: true,
    }),
    new EncodingPlugin({
      encoding: 'UTF-8',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `./src/assets`,
          to: 'assets',
        },
        {
          from: `../../assets/common`,
          to: 'assets/common',
        }
      ]}
    )
  ],
  devtool: void 0,
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, '../../common')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              'react-hot-loader/babel',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf)$/i,
        use: 'file-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  }
};
