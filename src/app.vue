<template>
    <div id="app" :class="backend ? 'backend' : 'frontend'">
        <Navigation :backend="backend"></Navigation>
        <transition :name="pageTransitionName" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter">
            <keep-alive>
                <router-view :key="$route.fullPath" v-if="!$route.meta.notKeepAlive" class="app-view"></router-view>
            </keep-alive>
        </transition>
        <transition :name="pageTransitionName" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter">
            <router-view :key="$route.fullPath" v-if="$route.meta.notKeepAlive" class="app-view"></router-view>
        </transition>
        <sign-up :show="global.showRegisterModal"></sign-up>
        <sign-in :show="global.showLoginModal"></sign-in>
        <back-top></back-top>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
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
        return {}
    },
    computed: {
        ...mapGetters({
            global: 'global/getGlobal'
        }),
        ...mapState('appShell', ['pageTransitionName']),
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
