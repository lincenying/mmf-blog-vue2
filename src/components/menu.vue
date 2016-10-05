<template>
    <div class="g-hd">
        <About></About>
        <div v-if="visit" class="box menu">
            <div class="m-sch">
                <form action="/search" method="get">
                    <input id="search_content" class="sch" type="text" name="q" />
                </form>
            </div>
            <div class="m-nav">
                <router-link to="/">首页</router-link>
                <router-link to="/category/1">生活</router-link>
                <router-link to="/category/2">工作</router-link>
                <router-link to="/category/3">其他</router-link>
            </div>
        </div>
        <div v-if="!visit" class="box menu">
            <div class="m-nav">
                <router-link to="/">首页</router-link>
                <router-link to="/list/1">列表</router-link>
                <router-link to="/post">发布</router-link>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import About from './about.vue'
    export default {
        data() {
            return {
                visit: false
            }
        },
        components: {
            About
        },
        mounted() {
            this.visit = this.$route.name === 'index' || this.$route.name === 'article' || this.$route.name === 'category'
        }
    }
</script>
