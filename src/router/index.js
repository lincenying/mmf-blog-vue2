import Vue from 'vue'
import VueRouter from 'vue-router'
import ls from 'store2'
import cookies from 'js-cookie'

import index from '../pages/index.vue'
import article from '../pages/article.vue'
import adminPost from '../pages/post.vue'
import adminEdit from '../pages/edit.vue'
import adminList from '../pages/list.vue'

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
    var token = ls.get('token') && cookies.get('user')
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
        { name:'index', path: '/', component: index },
        { name:'category', path: '/category/:id(\\d+)', component: index },
        { name:'search', path: '/search/:qs', component: index },
        { name:'article', path: '/article/:id', component: article, meta: { scrollToTop: true } },
        { name:'list', path: '/list/:page(\\d+)', component: adminList, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { name:'post', path: '/post', component: adminPost, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { name:'edit', path: '/edit/:id/:page', component: adminEdit, meta: { scrollToTop: true }, beforeEnter: guardRoute }
    ]
})



export default router
