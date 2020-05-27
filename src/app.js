/**
 * @file entry
 * @author lincenying(lincenying@qq.com)
 */

import ProgressBar from '@/components/progress-bar.vue'
import cookies from 'js-cookie'
import 'toastr/build/toastr.css'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import api from '~api'
import App from './app.vue'
import './assets/css/hljs/googlecode.css'
import './assets/less/style.less'
import VueBus from './event-bus'
import * as filters from './filters'
import titleMixin from './mixins'
import './polyfill'
import './registerServiceWorker'
import { createRouter } from './router'
import { createStore } from './store'
import { oc } from './utils'

Vue.use(VueBus)
Vue.mixin(titleMixin)

const loading = (Vue.prototype.$loading = new Vue(ProgressBar).$mount())
document.body.appendChild(loading.$el)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.prototype.$oc = oc
Vue.config.productionTip = false

/* eslint-disable no-new */
const router = createRouter()
const store = createStore()
store.$api = store.state.$api = api
store.commit('global/setCookies', {
    user: cookies.get('user'),
    userid: cookies.get('userid'),
    username: cookies.get('username'),
    useremail: cookies.get('useremail')
})
window.$$store = store
sync(store, router)
Vue.mixin({
    // 当复用的路由组件参数发生变化时，例如/detail/1 => /detail/2
    /*
    beforeRouteUpdate(to, from, next) {
        // asyncData方法中包含异步数据请求
        const asyncData = this.$options.asyncData
        if (asyncData) {
            loading.start()
            asyncData
                .call(this, {
                    store: this.$store,
                    route: to,
                    isServer: false,
                    isClient: true
                })
                .then(() => {
                    loading.finish()
                    next()
                })
                .catch(next)
        } else {
            next()
        }
    },
    */

    // 路由切换时，保存页面滚动位置
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.$nextTick().then(() => {
                const scrollTop = vm.$store.state.appShell.historyPageScrollTop[to.fullPath] || 0
                window.scrollTo(0, scrollTop)
                // document.body.scrollTop = vm.$store.state.appShell.historyPageScrollTop[to.fullPath] || 0
            })
        })
    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch('appShell/saveScrollTop', {
            path: from.fullPath,
            scrollTop: Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        })
        next()
    }
})

// 此时异步组件已经加载完成
router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // [a, b]
    // [a, b, c, d]
    // => [c, d]
    let diffed = false
    const activated = matched.filter((c, i) => diffed || (diffed = prevMatched[i] !== c))

    if (!activated.length) {
        return next()
    }

    loading.start()
    Promise.all(
        activated.map(c => {
            /**
             * 两种情况下执行asyncData:
             * 1. 非keep-alive组件每次都需要执行
             * 2. keep-alive组件首次执行，执行后添加标志
             */
            if (c.asyncData && (!c.asyncDataFetched || to.meta.notKeepAlive)) {
                return c
                    .asyncData({
                        store,
                        route: to,
                        isServer: false,
                        isClient: true
                    })
                    .then(() => {
                        c.asyncDataFetched = true
                    })
            }
        })
    )
        .then(() => {
            loading.finish()
            next()
        })
        .catch(next)
})
const app = new Vue({
    router,
    store,
    ...App
})
app.$mount('#app')
