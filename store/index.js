import { defineStore } from 'pinia';
import useMyFetch from '~/composables/useMyFetch';

export const useMainStore = defineStore('main', {
  state: () => ({
    posts: [],
  }),
  getters: {
    getPosts(state) {
      return state.posts;
    },
  },
  actions: {
    setArticles(posts) {
      this.posts = posts;
    },
    loadPosts() {
      return useMyFetch('/posts').then((res) => {
        const posts = res.map((post) => {
          const temp = post;
          temp.picture = JSON.parse(post.picture);
          return temp;
        });
        this.setArticles(posts);
        return true;
      });
    },
  },
});
