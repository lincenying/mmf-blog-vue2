import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import cookies from 'js-cookie'

import {inBrowser} from '../utils'

import index from '../pages/frontend-index.vue'
import article from '../pages/frontend-article.vue'
import about from '../pages/frontend-about.vue'
import account from '../pages/frontend-user-account.vue'
import password from '../pages/frontend-user-password.vue'

Vue.use(VueRouter)
Vue.use(Meta)

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
    var token = cookies.get('user') || !inBrowser
    if (!token) {
        next('/')
    } else {
        next()
    }
}

const router = new VueRouter({
    mode: 'history',
    //base: __dirname,
    scrollBehavior,
    routes: [
        { name:'index', path: '/', component: index },
        { name:'trending', path: '/trending/:by', component: index },
        { name:'category', path: '/category/:id', component: index },
        { name:'search', path: '/search/:key', component: index },
        { name:'article', path: '/article/:id', component: article, meta: { scrollToTop: true } },
        { name:'about', path: '/about', component: about, meta: { scrollToTop: true } },
        { name:'account', path: '/user/account', component: account, meta: { scrollToTop: true }, beforeEnter: guardRoute },
        { name:'password', path: '/user/password', component: password, meta: { scrollToTop: true }, beforeEnter: guardRoute }
    ]
})



export default router
