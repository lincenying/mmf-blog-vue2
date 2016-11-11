<template>
<div class="g-doc">
    <div class="g-hd">
        <About></About>
        <Navigation :visit="visit" :search="search"></Navigation>
    </div>
    <transition name="fade" mode="out-in">
        <router-view class="router"></router-view>
    </transition>
    <Copyright></Copyright>
    <Arrow></Arrow>
</div>
</template>
<script lang="babel">
import '../static/editor.md/css/editormd.css'
import './assets/css/hljs/googlecode.css'
import './assets/css/style.css'
import '../node_modules/toastr/build/toastr.css'
import '../node_modules/nprogress/nprogress.css'
import { mapGetters } from 'vuex'
import NProgress from 'nprogress'
import About from './components/about.vue'
import Navigation from './components/navigation.vue'
import Copyright from './components/copyright.vue'
import Arrow from './components/arrow.vue'
export default {
    computed: {
        ...mapGetters({
            global: 'getGlobal'
        }),
        visit() {
            return ['index', 'article', 'category', 'search'].includes(this.$route.name)
        }
    },
    components: {
        About,
        Navigation,
        Copyright,
        Arrow
    },
    methods: {
        search(e) {
            var qs = e.target.value
            if (qs === "") {
                return false
            }
            this.$router.replace('/search/' + qs)
        }
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
        background: url(http://beian.gov.cn/img/ghs.png);
        background-size: cover;
        display: inline-block;
        vertical-align: top;
    }
</style>
