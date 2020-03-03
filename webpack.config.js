const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./source/index.js"],
  output: {
    path: "./",
    filename: "bin/app.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "node_modules/Color"),
          path.resolve(__dirname, "node_modules/Pixels"),
          path.resolve(__dirname, "node_modules/ConvexText"),
          path.resolve(__dirname, "node_modules/MultiHandlerFactory"),
          path.resolve(__dirname, "source")
        ],
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    //*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
    //*/
  ],
  devServer: {
    inline: true
  }
};
