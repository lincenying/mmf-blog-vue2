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
<style media="screen">
@import "./assets/css/hljs/googlecode.css";
@import "./assets/css/style.css";
@import "../node_modules/toastr/build/toastr.css";
@import "../node_modules/nprogress/nprogress.css";
.fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter {
    opacity: 1;
    transform: translate3d(0, 100px, 0);
}
.fade-leave-active {
    opacity: 0;
    transform: translate3d(100px, 0, 0);
}
.beian {
    float: right;
}
.beian i {
    width: 14px;
    height: 14px;
    background: url(http://ww4.sinaimg.cn/large/005uQRNCgw1f9xoio7mdej300k00k3y9.jpg);
    background-size: cover;
    display: inline-block;
    vertical-align: top;
}
</style>
