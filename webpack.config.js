var path = require('path');
const webpack = require('webpack');

module.exports  = {
  entry: './src/client.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  watch: true,
  module: {
    loaders: [
      {
        test:/\.jsx$/,
        exclude:/node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-3']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'RIOT_API_KEY': '"51d93823-1cb4-4507-a651-a77759d2144e"'
      }
    })
  ]
}
