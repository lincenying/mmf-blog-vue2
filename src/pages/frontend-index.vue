<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <topics-item-none v-if="!topics.path">加载中, 请稍等...</topics-item-none>
                <template v-else-if="topics.data.length > 0">
                    <topics-item v-for="item in topics.data" :item="item" :key="item._id"></topics-item>
                    <div class="load-more-wrap"><a v-if="topics.hasNext" @click="loadMore()" href="javascript:;" class="load-more">更多<i class="icon icon-circle-loading"></i></a></div>
                </template>
                <topics-item-none v-else>当前分类还没有文章...</topics-item-none>
            </div>
        </div>
        <div class="main-right">
            <category :category="category"></category>
            <trending :trending="trending"></trending>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import topicsItem from '../components/topics-item.vue'
import topicsItemNone from '../components/topics-item-none.vue'
import category from '../components/aside-category.vue'
import trending from '../components/aside-trending.vue'
import metaMixin from '~mixins'

export default {
    name: 'frontend-index',
    async asyncData({ store, route }, config = { page: 1 }) {
        const { params: { id, key, by }, path } = route
        await Promise.all([
            store.dispatch('global/category/getCategoryList'),
            store.dispatch('frontend/article/getTrending'),
            store.dispatch('frontend/article/getArticleList', { ...config, limit: 10, id, path, key, by }),
        ])
    },
    mixins: [metaMixin],
    components: {
        topicsItem,
        topicsItemNone,
        category,
        trending,
    },
    computed: {
        ...mapGetters({
            topics: 'frontend/article/getArticleList',
            category: 'global/category/getCategoryList',
            trending: 'frontend/article/getTrending',
        }),
    },
    methods: {
        async loadMore(page = this.topics.page + 1) {
            this.$loading.start()
            await this.$options.asyncData({ store: this.$store, route: this.$route }, { page })
            this.$loading.finish()
        },
    },
    activated() {
        this.loadMore(1)
    },
    metaInfo() {
        var title = 'M.M.F 小屋'
        const { id, key, by } = this.$route.params
        if (id) {
            const obj = this.category.find(item => item._id === id)
            if (obj) {
                title = obj.cate_name + ' - ' + title
            }
        } else if (key) {
            title = '搜索: ' + key + ' - ' + title
        } else if (by) {
            title = '热门 - ' + title
        }
        return {
            title,
            meta: [{ vmid: 'description', name: 'description', content: title }],
        }
    },
}
</script>
