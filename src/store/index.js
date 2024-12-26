import { createStore } from 'vuex'

export default createStore({
  state: {
    baseUrl: process.env.VUE_APP_API_URL
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getBaseUrl(state) {
      return state.baseUrl
    }
  },
  modules: {
  }
})
