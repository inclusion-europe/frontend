import Admin from '@/pages/Admin'
import ArticleEditor from '@/pages/Admin/ArticleEditor'
import Articles from '@/pages/Admin/Articles.vue'
import Homepage from '@/pages/Homepage'

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
]