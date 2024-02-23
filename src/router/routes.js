import Admin from '@/pages/Admin';
import PostEditor from '@/pages/Admin/PostEditor';
import Posts from '@/pages/Admin/Posts.vue';
import PostPage from '@/pages/Post.vue';
import Countries from '@/pages/InclusionIndicators/Countries.vue';
import CountryPage from '@/pages/InclusionIndicators/CountryPage.vue';
import HistoryPage from '@/pages/History/index.vue';
import Homepage from '@/pages/Homepage';
import PostsList from '@/pages/PostsList.vue';
import store from '@/store';

export default [
    {
        path: '/',
        name: 'home',
        component: Homepage,
    },
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/posts',
        component: Admin,
        meta: {
            title: 'Admin panel',
        },
        children: [
            {
                path: 'posts',
                name: 'admin-posts',
                component: Posts,
            },
            {
                path: 'editor',
                name: 'admin-post_edit',
                component: PostEditor,
            },
        ],
    },
    {
        path: '/inclusion-indicators/countries',
        name: 'inclusion-indicators.countries',
        component: Countries,
    },
    {
        path: '/indicators/:country',
        name: 'indicators.country',
        component: CountryPage,
    },
    {
        path: '/history',
        name: 'history',
        component: HistoryPage,
    },
    {
        path: '/tag/:tag',
        name: 'tag',
        component: PostsList,
    },
    {
        path: '/type/:type',
        name: 'type',
        component: PostsList,
    },
    {
        path: '/:post',
        name: 'post',
        beforeEnter: (to, from, next) => {
            if (!store.state.posts.length) {
                store.dispatch('loadPosts').then(next);
            } else {
                next();
            }
        },
        component: PostPage,
    },
    {
        path: '/v/:post',
        name: 'post_old',
        beforeEnter: (to, from, next) => {
            if (!store.state.posts.length) {
                store.dispatch('loadPosts').then(next);
            } else {
                next();
            }
        },
        component: PostPage,
    },
];
