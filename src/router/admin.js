import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'js-cookie'

import {inBrowser} from '../utils'

const login = r => require.ensure([], () => r(require('../pages/backend-login.vue')), 'chunk-backend-login')
const articleList = r => require.ensure([], () => r(require('../pages/backend-article-list.vue')), 'chunk-backend-article')
const articleInsert = r => require.ensure([], () => r(require('../pages/backend-article-insert.vue')), 'chunk-backend-article')
const articleModify = r => require.ensure([], () => r(require('../pages/backend-article-modify.vue')), 'chunk-backend-article')
const articleComment = r => require.ensure([], () => r(require('../pages/backend-article-comment.vue')), 'chunk-backend-article')

const categoryList = r => require.ensure([], () => r(require('../pages/backend-category-list.vue')), 'chunk-backend-category')
const categoryInsert = r => require.ensure([], () => r(require('../pages/backend-category-insert.vue')), 'chunk-backend-category')
const categoryModify = r => require.ensure([], () => r(require('../pages/backend-category-modify.vue')), 'chunk-backend-category')

const adminList = r => require.ensure([], () => r(require('../pages/backend-admin-list.vue')), 'chunk-backend-admin')
const adminModify = r => require.ensure([], () => r(require('../pages/backend-admin-modify.vue')), 'chunk-backend-admin')

const userList = r => require.ensure([], () => r(require('../pages/backend-user-list.vue')), 'chunk-backend-user')
const userModify = r => require.ensure([], () => r(require('../pages/backend-user-modify.vue')), 'chunk-backend-user')

Vue.use(VueRouter)

const scrollBehavior = to => {
    const position = {}
    if (to.hash) {
        position.selector = to.hash
    }
    if (to.matched.some(mm => mm.meta.scrollToTop)) {
        position.x = 0
        position.y = 0
    }
    return position
}

const guardRoute = (to, from, next) => {
    const token = cookies.get('b_user') || !inBrowser
    if (!token) {
        next('/')
    } else {
        next()
    }
}

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior,
    routes: [
        { name:'login', path: '/backend', component: login },

        { name:'admin_list', path: '/backend/admin/list', component: adminList, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { name:'admin_modify', path: '/backend/admin/modify/:id', component: adminModify, meta: { scrollToTop: true }, beforeEnter: guardRoute },

        { name:'article_list', path: '/backend/article/list', component: articleList, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { name:'article_insert', path: '/backend/article/insert', component: articleInsert, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { name:'article_modify', path: '/backend/article/modify/:id', component: articleModify, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { name:'article_comment', path: '/backend/article/comment/:id', component: articleComment, meta: { scrollToTop: true }, beforeEnter: guardRoute },

        { name:'category_list', path: '/backend/category/list', component: categoryList, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { name:'category_insert', path: '/backend/category/insert', component: categoryInsert, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { name:'category_modify', path: '/backend/category/modify/:id', component: categoryModify, meta: { scrollToTop: true }, beforeEnter: guardRoute },

        { name:'user_list', path: '/backend/user/list', component: userList, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { name:'user_modify', path: '/backend/user/modify/:id', component: userModify, meta: { scrollToTop: true }, beforeEnter: guardRoute },

        { path: '*', redirect: { name: 'login' }}
    ]
})



export default router
