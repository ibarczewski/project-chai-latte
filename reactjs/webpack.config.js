module.exports = {
    //...
    devServer: {
      historyApiFallback: true
    },
    rewrites: [
        { from: /^\/$/, to: '/user/login' },       
      ]
  };