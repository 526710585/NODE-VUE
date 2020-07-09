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

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

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
  },
  {
    path: '/items/create',
    component: ItemEdit
  },
  {
    path: '/items/list',
    component: ItemList
  },
  {
    path: '/items/edit/:id',
    component: ItemEdit,
    props: true
  }
]
}]

const router = new VueRouter({
  routes
})

export default router