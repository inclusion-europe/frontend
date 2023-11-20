import { createStore } from 'vuex'
import axios from '@/scripts/axios'

export default createStore({
  state: {
    articles: [],
  },
  getters: {
    getArticles(state) {
      return state.articles
    },
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },
  },
  actions: {
    loadArticles(context) {
      return axios.get('/articles').then(res => {
        context.commit('SET_ARTICLES', res.data)
        return true
      })
    },
  },
  modules: {
  }
})
