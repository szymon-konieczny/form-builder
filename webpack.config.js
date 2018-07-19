const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 8080;

module.exports = env => {
  const isProduction = env === 'production';

  return {
    mode: 'development',  
    entry: './src/index.js',
    output: {
      filename: 'bundle.[hash].js'
    },
    devtool: 'source-map',
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },{
        test: /\.s?css$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      host: 'localhost',
      port: port,
      historyApiFallback: true,
      open: true
    }
  }
};