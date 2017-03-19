<template>
<div id="app" class="g-doc">
    <Navigation :backend="backend"></Navigation>
    <transition name="fade" mode="out-in">
        <router-view :key="key" class="router"></router-view>
    </transition>
    <sign-up v-if="!backend" :show="global.showRegisterModal"></sign-up>
    <sign-in v-if="!backend" :show="global.showLoginModal"></sign-in>
</div>
</template>
<script lang="babel">
import { mapGetters } from 'vuex'
import NProgress from 'nprogress'
import Navigation from './components/navigation.vue'
import signUp from './components/signup.vue'
import signIn from './components/signin.vue'

export default {
    computed: {
        ...mapGetters({
            global: 'global/getGlobal'
        }),
        key() {
            return this.$route.path.replace(/\//g, '_')
        },
        backend() {
            return this.$route.path.indexOf('backend') >= 0
        }
    },
    components: {
        Navigation,
        signUp,
        signIn
    },
    watch: {
        'global.progress'(val) {
            if (val === 0) {
                NProgress.set(0)
                NProgress.start()
            } else if (val === 100) {
                NProgress.done()
            } else {
                NProgress.set(val/100)
                NProgress.start()
            }
        }
    }
}
</script>
