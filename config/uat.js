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
