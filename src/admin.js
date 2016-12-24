import Vue from 'vue'
import App from './admin.vue'
import store from './store'
import router from './router/admin'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'

sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

const app = new Vue({
    router,
    store,
    ...App
})

app.$mount('#app')
