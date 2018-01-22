const path = require('path');

module.exports = {
  entry: './src/app.ts',
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};