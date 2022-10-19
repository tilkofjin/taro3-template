module.exports = {
  env: {
    APP_ENV: '"uat"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      proxy: {
        "/api": {
          target: 'http://xxx.xxx.xxx.xxx:8000',
          changeOrigin: true,
          pathRewrite: {
            "^": "",
          },
        },
      },
    },
  }
}
