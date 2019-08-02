var path = require('path');

module.exports = {
  entry: './src/client/index.js',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query:{
        presets: ["@babel/preset-env", "@babel/preset-react"]
      }
    }]
  }
};
