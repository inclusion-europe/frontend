import { createStore } from 'vuex';
import axios from '@/scripts/axios';

export default createStore({
    state: {
        posts: [],
    },
    getters: {
        getPosts(state) {
            return state.posts;
        },
    },
    mutations: {
        SET_ARTICLES(state, posts) {
            Object.assign(state, { posts });
        },
    },
    actions: {
        loadPosts(context) {
            return axios.get('/posts').then((res) => {
                const posts = res.data.map((post) => {
                    const temp = post;
                    temp.picture = JSON.parse(post.picture);
                    return temp;
                });
                context.commit('SET_ARTICLES', posts);
                return true;
            });
        },
    },
    modules: {},
});
