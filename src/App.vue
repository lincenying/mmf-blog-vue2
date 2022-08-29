<template>
    <div id="app" :class="backend ? 'backend' : 'frontend'">
        <Navigation :backend="backend"></Navigation>
        <template v-if="!backend">
            <transition :name="appShell.pageTransitionName" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter" mode="out-in">
                <keep-alive :include="cacheFronentComponents"> <router-view :key="key" class="app-view" /> </keep-alive>
            </transition>
            <sign-up :show="global.showRegisterModal"></sign-up>
            <sign-in :show="global.showLoginModal"></sign-in>
            <back-top></back-top>
        </template>
        <div v-else class="main wrap">
            <div class="main-left">
                <div class="home-feeds cards-wrap">
                    <transition :name="appShell.pageTransitionName" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter" mode="out-in">
                        <keep-alive :include="cacheBackendComponents"> <router-view class="app-view" /> </keep-alive>
                    </transition>
                </div>
            </div>
            <backend-menu v-if="!isLogin"></backend-menu>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navigation from './components/navigation.vue'
import signUp from './components/signup.vue'
import signIn from './components/signin.vue'
import backTop from './components/backtop.vue'
import backendMenu from './components/backend-menu.vue'

export default {
    name: 'app',
    components: {
        Navigation,
        signUp,
        signIn,
        backTop,
        backendMenu
    },
    data() {
        return {
            // 需要缓存的路由组件 name
            cacheFronentComponents: 'frontend-index,frontend-about',
            cacheBackendComponents: 'backend-admin-list,backend-article-list,backend-user-list'
        }
    },
    computed: {
        ...mapGetters({
            global: 'global/get',
            appShell: 'appShell/get'
        }),
        key() {
            return this.$route.path.replace(/\//g, '_')
        },
        backend() {
            return this.$route.path.indexOf('backend') >= 0
        },
        isLogin() {
            return ['/backend', '/backend/'].includes(this.$route.path)
        }
    },
    methods: {
        handleBeforeEnter() {
            this.$store.dispatch('appShell/setPageSwitching', true)
        },
        handleAfterEnter() {
            this.$store.dispatch('appShell/setPageSwitching', false)
        },
        handleClickHeaderBack() {
            this.$router.go(-1)
        }
    }
}
</script>
