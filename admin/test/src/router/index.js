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

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdminUsersEdit from '../views/AdminUsersEdit.vue'
import AdminUsersList from '../views/AdminUsersList.vue'

import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta:{isPublic:true}
  },
  {
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
  ,
  {
    path: '/heroes/create',
    component: HeroEdit
  },
  {
    path: '/heroes/list',
    component: HeroList
  },
  {
    path: '/heroes/edit/:id',
    component: HeroEdit,
    props: true
  },
  {
    path: '/articles/create',
    component: ArticleEdit
  },
  {
    path: '/articles/list',
    component: ArticleList
  },
  {
    path: '/articles/edit/:id',
    component: ArticleEdit,
    props: true
  },
  {
    path: '/admin_users/create',
    component: AdminUsersEdit
  },
  {
    path: '/admin_users/list',
    component: AdminUsersList
  },
  {
    path: '/admin_users/edit/:id',
    component: AdminUsersEdit,
    props: true
  }
]
}]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic&&!localStorage.token){
    next('/login')
  }
  next()
})

export default router