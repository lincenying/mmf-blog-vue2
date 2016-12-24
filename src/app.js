import Vue from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'

sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

router.beforeEach((route, redirect, next) => {
    store.dispatch('global/gProgress', 0)
    next()
})

const app = new Vue({
    router,
    store,
    ...App
})

app.$mount('#app')
