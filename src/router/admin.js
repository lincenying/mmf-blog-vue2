import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'js-cookie'

import inBrowser from '../utils'

import login from '../pages/backend-login.vue'
import articleList from '../pages/backend-article-list.vue'
import articleInsert from '../pages/backend-article-insert.vue'
import articleModify from '../pages/backend-article-modify.vue'
import articleComment from '../pages/backend-article-comment.vue'

import categoryList from '../pages/backend-category-list.vue'
import categoryInsert from '../pages/backend-category-insert.vue'
import categoryModify from '../pages/backend-category-modify.vue'

import adminList from '../pages/backend-admin-list.vue'
import adminModify from '../pages/backend-admin-modify.vue'

import userList from '../pages/backend-user-list.vue'
import userModify from '../pages/backend-user-modify.vue'

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
    var token = cookies.get('_user') || !inBrowser
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

    ]
})



export default router
