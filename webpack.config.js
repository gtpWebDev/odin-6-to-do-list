const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* This setup enables:
  - bundling of assets: style sheets, fonts and images
  - bundling of html files
  - source-based error codes
  - tidying up of dist folder
  - a dev server which shows live dev updates
*/

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map', // changes error codes to source files
  devServer: { // enables live updates during dev
    static: './src', // redirected to src, rather than default dist
  },
  // optimization: { // avoids issues should there be multiple entry points, only use then
  //   runtimeChunk: 'single',
  // },
  plugins: [
    new HtmlWebpackPlugin({ // html files are bundled, using the template below
      title: 'Output Management',
      template: './src/template.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // cleans up the dist directory on each build
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};