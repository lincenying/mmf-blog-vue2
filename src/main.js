/* global document */
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
    router,
    store,
    ...App
})

router.beforeEach((to, from, next) => {
    store.dispatch('gProgress', 0)
    next()
})

app.$mount('#app')
