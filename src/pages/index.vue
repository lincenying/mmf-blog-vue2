<template>
    <div class="g-mn">
        <div class="posts">
            <index-item v-for="item in topics.list" :item="item" :ispc="isPC"></index-item>
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
import ls from 'store2'
import { mapGetters } from 'vuex'
import indexItem from '../components/index-item.vue'
import { ua, ssp } from '../utils'
const fetchInitialData = async (store, config = { page: 1}) => {
    const {params: {id, qs}, path} = store.state.route
    const base = {
        ...config,
        markdown: 1,
        limit: 10,
        id,
        qs
    }
    await store.dispatch('getTopics', base)
    if (config.page === 1) ssp(path)
}
export default {
    prefetch: fetchInitialData,
    components: {
        indexItem
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
    },
    beforeRouteLeave (to, from, next) {
        const scrollTop = document.body.scrollTop
        const path = this.$route.path
        if (scrollTop) ls.set(path, scrollTop)
        else ls.remove(path)
        next()
    }
}
</script>
