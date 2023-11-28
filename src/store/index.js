import { createStore } from 'vuex'
import axios from '@/scripts/axios'

export default createStore({
  state: {
    posts: [],
  },
  getters: {
    getPosts(state) {
      return state.posts
    },
  },
  mutations: {
    SET_ARTICLES(state, posts) {
      state.posts = posts
    },
  },
  actions: {
    loadPosts(context) {
      return axios.get('/posts').then(res => {
        let posts = res.data.map(post => {
          let temp = post
          temp.picture = JSON.parse(post.picture)
          return temp
        })
        context.commit('SET_ARTICLES', posts)
        return true
      })
    },
  },
  modules: {
  }
})
