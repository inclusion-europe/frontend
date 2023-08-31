import Admin from '@/pages/Admin'
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
    component: Admin,
  },
]