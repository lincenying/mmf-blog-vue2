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

router.beforeEach((to, from, next) => {
    const scrollTop = document.body.scrollTop
    const path = store.state.route.path
    if (path) {
        if (scrollTop) ls.set(path, scrollTop)
        if (ls.get(path) && !scrollTop) ls.set(path, 0)
    }
    store.dispatch('gProgress', 0)
    next()
})

app.$mount('#app')
