module.exports = {
  env: {
    NODE_ENV: '"uat"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        "/proxyH5/": {
          target: '',
          changeOrigin: true,
          pathRewrite: {
            "^/proxyH5": "",
          },
        },
      },
    },
  }
}
