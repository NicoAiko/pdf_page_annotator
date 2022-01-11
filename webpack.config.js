const { readdirSync } = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');

let themes = {};
readdirSync('./src/themes').forEach((value) => {
  themes = {
    ...themes,
    [value.replace('.scss', '')]: `./src/themes/${value}`,
  };
});

module.exports = {
  mode: process.NODE_ENV || 'development',
  entry: {
    'index.js': './src',
    ...themes,
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: {
                filter: () => false,
              },
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: globImporter(),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { publicPath: 'dist' },
          },
        ],
      },
      {
        test: /\.node$/,
        use: [
          {
            loader: 'native-addon-loader',
            options: { name: '[name]-[hash].[ext]' },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'themes/[name].css'
    }),
  ],
};
