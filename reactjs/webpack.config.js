module.exports = {
    //...
    devServer: {
      historyApiFallback: true
    },
    rewrites: [
        { from: /^\/$/, to: '/user/login' },       
      ]
      // plugins: [
      //   new webpack.optimize.LimitChunkCountPlugin({
      //     maxChunks: 1,
      //   }),
      // ]
  };