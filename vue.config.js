module.exports = {

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',

  transpileDependencies: [
    'vuetify',
    'vuex-persist'
  ]
}
