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
                <a v-link="{ name: 'index'}">首页</a>
                <a v-link="{ name: 'category', params: { id: 1 }}">生活</a>
                <a v-link="{ name: 'category', params: { id: 2 }}">工作</a>
                <a v-link="{ name: 'category', params: { id: 3 }}">其他</a>
            </div>
        </div>
        <div v-if="!visit" class="box menu">
            <div class="m-nav">
                <a v-link="{ name: 'index'}">首页</a>
                <a v-link="{ name: 'adminList', params: { page: 1 }}">列表</a>
                <a v-link="{ name: 'adminPost'}">发布</a>
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
        ready() {
            this.visit = this.$route.name === 'index' || this.$route.name === 'article' || this.$route.name === 'category'
        }
    }
</script>
