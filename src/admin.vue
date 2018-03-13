<template>
    <div id="app" :class="backend ? 'backend' : 'frontend'">
        <Navigation :backend="backend"></Navigation>
        <div class="main wrap clearfix">
            <div class="main-left">
                <div class="home-feeds cards-wrap">
                    <transition :name="pageTransitionName" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter">
                        <keep-alive>
                            <router-view :key="$route.fullPath" v-if="!$route.meta.notKeepAlive" class="app-view"></router-view>
                        </keep-alive>
                    </transition>
                    <transition :name="pageTransitionName" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter">
                        <router-view :key="$route.fullPath" v-if="$route.meta.notKeepAlive" class="app-view"></router-view>
                    </transition>
                </div>
            </div>
            <backend-menu v-if="!isLogin"></backend-menu>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import NProgress from 'nprogress'
import Navigation from './components/navigation.vue'
import backendMenu from './components/backend-menu.vue'

export default {
    name: 'backend',
    computed: {
        ...mapGetters({
            global: 'global/getGlobal',
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
        },
    },
    components: {
        backendMenu,
        Navigation,
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
        },
    },
    watch: {
        'global.progress'(val) {
            if (val === 0) {
                NProgress.set(0)
                NProgress.start()
            } else if (val === 100) {
                NProgress.done()
            } else {
                NProgress.set(val / 100)
                NProgress.start()
            }
        },
    },
}
</script>
