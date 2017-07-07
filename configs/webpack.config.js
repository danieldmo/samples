const path = require('path');
const glob = require('glob');
const webpack = require('webpack');

const appRoot = path.resolve(__dirname, 'src');
const BUNDLE_SERVER_PORT = 8080;
const entries = [
  'babel-polyfill',
  'webpack-dev-server/client?http://localhost:8080']
  .concat(glob.sync(path.resolve(appRoot, 'app/actions/**/!(*.test).js')))
  .concat(glob.sync(path.resolve(appRoot, 'app/reducers/**/!(*.test).js')))
  .concat(glob.sync(path.resolve(appRoot, 'app/**/!(*.test).jsx')))
  .concat(glob.sync(path.resolve(appRoot, 'app/components/*.scss')));

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(appRoot, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/
        ],
        use: [
          {
            loader: 'babel-loader?' + JSON.stringify({
              plugins: [
                'transform-decorators-legacy',
                'react-hot-loader/babel',
              ],
              presets: ['es2015', 'stage-0', 'react']
            })
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },

    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src/app'),
      path.resolve(__dirname, 'src/app/components-v2'),
      path.resolve(__dirname, 'src/app/components-v2/Shared'),
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: BUNDLE_SERVER_PORT
  }
}
