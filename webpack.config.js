const path = require('path');

module.exports = {
  entry: {
    main: './lib/index.js',
    test: 'mocha!./test/index-test.js'
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.css']
  }
};
