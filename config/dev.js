module.exports = {
  env: {
    NODE_ENV: '"development"',
    APP_ENV: '"dev"'
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
