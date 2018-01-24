const path = require('path');
module.exports = {
  entry: path.join(__dirname,'client/client.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,'public/'),
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.js$|\.jsx/, 
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg)/, 
        use: 'file-loader',
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}