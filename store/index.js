import { defineStore } from 'pinia';
import useMyFetch from '~/composables/useMyFetch';
import utils from '~/scripts/utils';

export const useMainStore = defineStore('main', {
  state: () => ({
    posts: [],
    loading: true,
  }),
  getters: {
    getPosts(state) {
      return state.posts;
    },
    isLoading(state) {
      return state.loading;
    },
    getPost(state) {
      return (post) => {
        const workPost = state.posts.find(
          (art) =>
            art.url.toLowerCase() ===
            `/${encodeURIComponent(post).toLowerCase()}`
        );
        if (workPost) {
          workPost.content = unescape(workPost.content);
          workPost.content_e2r =
            typeof workPost.content_e2r === 'string'
              ? JSON.parse(workPost.content_e2r)
              : workPost.content_e2r;
          workPost.tags =
            typeof workPost.tags === 'string'
              ? workPost.tags.split(',')
              : workPost.tags;

          return workPost;
        } else {
          return undefined;
        }
      };
    },
  },
  actions: {
    setArticles(posts) {
      this.posts = posts;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    loadPost(post) {
      return useMyFetch(`/post/slug/${post}`).then((res) => {
        return utils.treatPost(res);
      });
    },
    loadPosts() {
      return useMyFetch('/posts').then((res) => {
        const posts = res.map((post) => {
          const temp = post;
          temp.picture = JSON.parse(post.picture);
          return temp;
        });
        this.setArticles(posts);
        this.setLoading(false);
      });
    },
  },
});
