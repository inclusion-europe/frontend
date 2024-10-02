import Admin from '@/pages/Admin';
import PostEditor from '@/pages/Admin/PostEditor';
import Posts from '@/pages/Admin/Posts.vue';
import PostPage from '@/pages/Post.vue';
import Countries from '@/pages/InclusionIndicators/Countries.vue';
import CountryPage from '@/pages/InclusionIndicators/CountryPage.vue';
import HistoryPage from '@/pages/History/index.vue';
import ProjectsPage from '@/pages/Projects/index.vue';
import TogetherPlus from '@/pages/Projects/TogetherPlus.vue';
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
        path: '/projects',
        name: 'projects',
        component: ProjectsPage,
    },
    {
        path: '/projects/together-plus',
        name: 'together-plus',
        component: TogetherPlus,
    },
    {
        path: '/tag/:tag',
        redirect: (to) => ({
            name: 'tag',
            params: { ...to.params, pageNr: 1 },
        }),
    },
    {
        path: '/type/:type',
        redirect: (to) => ({
            name: 'type',
            params: { ...to.params, pageNr: 1 },
        }),
    },
    {
        path: '/tag/:tag/:pageNr',
        name: 'tag',
        component: PostsList,
    },
    {
        path: '/type/:type/:pageNr',
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
