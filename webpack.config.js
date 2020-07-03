const path = require('path');
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './src/js/index.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: 'style-loader', // inject CSS to page
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              plugins() {
                // postcss plugins, can be exported to postcss.config.js
                return [
                  // eslint-disable-next-line max-len
                  // eslint-disable-next-line global-require,import/no-unresolved, import/no-extraneous-dependencies
                  require('autoprefixer'),
                ];
              },
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
};
