<template>
    <div class="g-mn">
        <div class="posts">
            <index-post v-for="item in topics.list" :item="item" :ispc="isPC"></index-post>
        </div>
        <div class="box m-page box-do">
            <div class="w-icon w-icon-2"></div>
            <div class="w-icon w-icon-3"></div>
            <a v-if="topics.hasNext" @click="loadMore()" href="javascript:;">加载更多</a>
            <span v-else>好厉害, 竟然翻到最后一页了...</span>
        </div>
    </div>
</template>
<script lang="babel">
import { mapGetters } from 'vuex'
import indexPost from './index-post.vue'
import { ua, ssp } from '../tools/command'
const fetchInitialData = async (store, config = { page: 1}) => {
    const {params: {id, qs}, path} = store.state.route
    const base = {
        ...config,
        action: 'getArticleList',
        markdown: 1,
        limit: 10,
        id,
        qs
    }
    await store.dispatch('getTopics', base)
    if (config.page === 1) ssp(path)
}
export default {
    components: {
        indexPost
    },
    computed: {
        ...mapGetters({
            topics: 'getTopics'
        }),
        isPC() {
            return ua() === "PC"
        }
    },
    methods: {
        loadMore(page = this.topics.page + 1) {
            fetchInitialData(this.$store, {page})
        }
    },
    mounted() {
        if (this.topics.list.length <= 0 || this.$route.path !== this.topics.path) {
            fetchInitialData(this.$store, {page: 1})
        } else {
            ssp(this.$route.path)
            this.$store.dispatch('gProgress', 100)
        }
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store, {page: 1})
        }
    }
}
</script>
