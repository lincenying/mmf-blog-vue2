import Vue from 'vue'
import Login from './Login.vue'
import store from './store'

const app = new Vue({
    store,
    ...Login
})

app.$mount('#app')
