module.exports = {
  env: {
    NODE_ENV: '"development"'
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
