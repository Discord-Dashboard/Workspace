const path = require('path');

module.exports = {
  entry: './src/index.ts', // Wejściowy plik aplikacji
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@lib': path.resolve(__dirname, 'src/lib/'),
      '@utils': path.resolve(__dirname, 'src/lib/utils/'),
      '@config': path.resolve(__dirname, 'src/lib/config/'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: '@discord-dashboard/core',
    libraryTarget: 'umd',
    globalObject: 'this',
    clean: true,
  },
  target: 'node',
  externals: [],
  devtool: 'source-map',
};
