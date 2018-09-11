/* eslint-disable no-inline-comments */
import Vue from 'vue'
import VueRouter from 'vue-router'
import cookies from 'js-cookie'

import { inBrowser } from '../utils'

const login = () => import(/* webpackChunkName: "backend-login" */ '../pages/backend-login.vue')
const articleList = () => import(/* webpackChunkName: "backend-topics" */ '../pages/backend-article-list.vue')
const articleInsert = () => import(/* webpackChunkName: "backend-topics" */ '../pages/backend-article-insert.vue')
const articleModify = () => import(/* webpackChunkName: "backend-topics" */ '../pages/backend-article-modify.vue')
const articleComment = () => import(/* webpackChunkName: "backend-topics" */ '../pages/backend-article-comment.vue')

const categoryList = () => import(/* webpackChunkName: "backend-category" */ '../pages/backend-category-list.vue')
const categoryInsert = () => import(/* webpackChunkName: "backend-category" */ '../pages/backend-category-insert.vue')
const categoryModify = () => import(/* webpackChunkName: "backend-category" */ '../pages/backend-category-modify.vue')

const adminList = () => import(/* webpackChunkName: "backend-admin" */ '../pages/backend-admin-list.vue')
const adminModify = () => import(/* webpackChunkName: "backend-admin" */ '../pages/backend-admin-modify.vue')

const userList = () => import(/* webpackChunkName: "backend-user" */ '../pages/backend-user-list.vue')
const userModify = () => import(/* webpackChunkName: "backend-user" */ '../pages/backend-user-modify.vue')

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
export function createRouter() {
    const router = new VueRouter({
        mode: 'history',
        base: __dirname,
        scrollBehavior,
        routes: [
            { name: 'login', path: '/backend', component: login },

            {
                name: 'admin_list',
                path: '/backend/admin/list',
                component: adminList,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },
            {
                name: 'admin_modify',
                path: '/backend/admin/modify/:id',
                component: adminModify,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },

            {
                name: 'article_list',
                path: '/backend/article/list',
                component: articleList,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },
            {
                name: 'article_insert',
                path: '/backend/article/insert',
                component: articleInsert,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },
            {
                name: 'article_modify',
                path: '/backend/article/modify/:id',
                component: articleModify,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },
            {
                name: 'article_comment',
                path: '/backend/article/comment/:id',
                component: articleComment,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },

            {
                name: 'category_list',
                path: '/backend/category/list',
                component: categoryList,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },
            {
                name: 'category_insert',
                path: '/backend/category/insert',
                component: categoryInsert,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },
            {
                name: 'category_modify',
                path: '/backend/category/modify/:id',
                component: categoryModify,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },

            {
                name: 'user_list',
                path: '/backend/user/list',
                component: userList,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },
            {
                name: 'user_modify',
                path: '/backend/user/modify/:id',
                component: userModify,
                meta: { scrollToTop: true },
                beforeEnter: guardRoute
            },

            { path: '*', redirect: { name: 'login' } }
        ]
    })
    return router
}
