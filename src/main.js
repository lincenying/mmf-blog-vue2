/* global document */
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import ls from 'store2'

sync(store, router)

const app = new Vue({
    router,
    store,
    ...App
})

router.beforeEach((route, redirect, next) => {
    var scrollTop = document.body.scrollTop
    if (store.state.route.path && scrollTop) {
        ls.set(store.state.route.path, scrollTop)
    }
    store.dispatch('gProgress', 0)
    next()
})

app.$mount('#app')
