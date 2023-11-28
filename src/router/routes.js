import Admin from '@/pages/Admin'
import PostEditor from '@/pages/Admin/PostEditor'
import Posts from '@/pages/Admin/Posts.vue'
import Post from '@/pages/Post.vue'
import Countries from '@/pages/InclusionIndicators/Countries.vue'
import Homepage from '@/pages/Homepage'
import PostsList from '@/pages/PostsList.vue'
import store from '@/store'

export default [
  {
    path: '/',
    name: 'home',
    component: Homepage,
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/articles',
    component: Admin,
    meta: {
      title: 'Admin panel',
    },
    children: [
      {
        path: 'articles',
        name: 'admin-articles',
        component: Posts,
      },
      {
        path: 'editor',
        name: 'admin-article_edit',
        component: PostEditor,
      },
    ]
  },
  {
    path: '/inclusion-indicators/countries',
    name: 'inclusion-indicators.countries',
    component: Countries,
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
    path: '/v/:post',
    name: 'post',
    beforeEnter: (to, from, next) => {
      if (!store.state.articles.length) {
        store.dispatch('loadPosts').then(next)
      } else {
        next()
      }
    },
    component: Post,
  }
]