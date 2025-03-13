import { defineStore } from 'pinia';
import useMyFetch from '~/composables/useMyFetch';
import utils from '~/scripts/utils';

export const useMainStore = defineStore('main', {
  state: () => ({
    posts: [],
    loading: true,
    menu: [],
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
    getMenu(state) {
      return state.menu;
    },
  },
  actions: {
    setArticles(posts) {
      this.posts = posts;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setMenu(menu) {
      this.menu = menu;
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
    loadMenu() {
      return useMyFetch('menu/full').then((res) => {
        const menu = res.sort((a, b) => a.position - b.position);
        menu.forEach((item) => {
          switch (item.id) {
            case 1:
              item.pages.push(
                {
                  idx: 97,
                  menu_position: 97,
                  title: 'Board and Staff',
                  url: '/staff',
                },
                {
                  idx: 98,
                  menu_position: 98,
                  title: 'History',
                  url: '/history',
                },
                {
                  idx: 99,
                  menu_position: 99,
                  title: 'Projects',
                  url: '/projects',
                }
              );
              break;
            case 2:
              item.pages.push({
                idx: 99,
                menu_position: 99,
                title: 'Articles',
                url: '/type/articles',
              });
              break;
            case 5:
              item.pages.push({
                idx: 99,
                menu_position: 99,
                title: 'Easy-To-Read Articles',
                url: '/type/e2r',
              });
              break;
            default:
          }
        });
        this.setMenu(menu);
      });
    },
  },
});
