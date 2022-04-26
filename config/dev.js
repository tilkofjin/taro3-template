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
        "/api": {
          target: '',
          changeOrigin: true,
          pathRewrite: {
            "^": "",
          },
        },
      },
    },
  }
}
