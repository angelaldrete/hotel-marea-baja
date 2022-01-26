import Vue from 'vue'
import Vuex from 'vuex'
import reservation from './reservation'
import user from './user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    reservation,
    user
  },
  plugins: [createPersistedState()]
})
