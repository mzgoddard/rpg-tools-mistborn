const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/main',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    loaders: [
      {
        test: /\.(styl|css)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ],
      },
      {
        test: /\.hbs$/,
        loader: 'ember-templates-loader',
      }
    ]
  },
  resolve: {
    modulesDirectories: ['bower_components', 'node_moules'],
  },
};
