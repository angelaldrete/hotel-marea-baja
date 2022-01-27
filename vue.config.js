module.exports = {

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/hotel_mb/' : '/',

  transpileDependencies: [
    'vuetify',
    'vuex-persist'
  ]
}
