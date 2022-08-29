/**
 * @file entry
 * @author lincenying(lincenying@qq.com)
 */

import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import * as filters from './filters'
import titleMixin from './mixins'
import { createRouter } from './router'
import { createStore } from './store'
import { oc } from './utils'

import App from './App.vue'

Vue.mixin(titleMixin)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.prototype.$oc = oc
Vue.config.productionTip = false

/* eslint-disable no-new */
export function createApp() {
    const router = createRouter()
    const store = createStore()
    sync(store, router)
    const app = new Vue({
        router,
        store,
        ...App
    })
    return { app, router, store }
}
