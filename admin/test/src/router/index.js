import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
// const CategoryList = () => import('../views/CategoryList.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Main',
  component: Main,
  children: [{
    path: '/categories/create',
    component: CategoryEdit
  },
  {
    path: '/categories/list',
    component: CategoryList
  },
  {
    path: '/categories/edit/:id',
    component: CategoryEdit,
    props: true
  }
]
}]

const router = new VueRouter({
  routes
})

export default router