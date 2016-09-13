<template>
<div class="g-doc">
    <div class="g-hd">
        <About></About>
        <div v-if="visit" class="box menu">
            <div class="m-sch">
                <input @keyup.enter="search($event)" id="search_content" class="sch" type="text" name="q" placeholder="记得按回车哦" />
            </div>
            <div class="m-nav">
                <ul class="menuOpen">
                    <li class="tag-all">
                        <router-link to="/" exact><i></i>All</router-link>
                    </li>
                    <li class="tag-life">
                        <router-link to="/category/1"><i></i>Life</router-link>
                    </li>
                    <li class="tag-study">
                        <router-link to="/category/2"><i></i>Study</router-link>
                    </li>
                    <li class="tag-other">
                        <router-link to="/category/3"><i></i>Other</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="!visit" class="box menu">
            <div class="m-nav">
                <ul class="menuOpen">
                    <li class="tag-all">
                        <router-link to="/" exact><i></i>All</router-link>
                    </li>
                    <li class="tag-life">
                        <router-link to="/list/1"><i></i>List</router-link>
                    </li>
                    <li class="tag-study">
                        <router-link to="/post"><i></i>Post</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <transition name="fade" mode="out-in">
        <router-view class="router"></router-view>
    </transition>
    <div class="g-ft">
        <span class="copy"><span title="Copyright">©</span> <a href="/">M·M·F 小屋</a> 2016.06</span>
        <span class="beian"><i></i> <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=000000000000">浙公网安备 000000000000号</a></span>
    </div>
    <div class="arrow">
        <a class="go-top" href="javascript:;" @click="goTop"></a>
        <a class="go-back" href="javascript:;" @click="goBack"></a>
    </div>
</div>
</template>
<script lang="babel">
import '../static/editor.md/css/editormd.css'
import '../html/css/hljs/googlecode.css'
import '../html/css/style.css'
import '../node_modules/toastr/build/toastr.css'
import '../node_modules/nprogress/nprogress.css'
import { mapGetters } from 'vuex'
import NProgress from 'nprogress'
import About from './components/about.vue'
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
        About
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goTop() {
            window.scrollTo(0, 0)
        },
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
