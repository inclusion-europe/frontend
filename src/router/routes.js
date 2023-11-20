import Admin from '@/pages/Admin'
import ArticleEditor from '@/pages/Admin/ArticleEditor'
import Articles from '@/pages/Admin/Articles.vue'
import Article from '@/pages/Article.vue'
import Homepage from '@/pages/Homepage'
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
    children: [
      {
        path: 'articles',
        name: 'admin-articles',
        component: Articles,
      },
      {
        path: 'editor',
        name: 'admin-article_edit',
        component: ArticleEditor,
      },
    ]
  },
  {
    path: '/:article',
    name: 'article',
    beforeEnter: (to, from, next) => {
      if (!store.state.articles.length) {
        store.dispatch('loadArticles').then(next)
      } else {
        next()
      }
    },
    component: Article,
  }
]