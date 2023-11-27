import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'


const beforeEach = (to, from, next) => {
  console.log({to})
  let title_prefix = ''
  if (to.meta.title) {
    title_prefix = to.meta.title + ' | '
  }
  document.title = title_prefix + process.env.VUE_APP_DEFAULT_TITLE;
  next()
}

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

router.beforeEach(beforeEach)

export default router