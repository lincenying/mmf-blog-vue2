<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <!-- <topics-item-none v-if="!topics.path">加载中, 请稍等...</topics-item-none> -->
                <div v-if="!topics.path" class="card card-content-loader">
                    <content-loader :height="160" :width="660" :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb">
                        <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" /> <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
                        <rect x="0" y="80" rx="3" ry="3" width="550" height="6.4" /> <rect x="0" y="100" rx="3" ry="3" width="620" height="6.4" />
                        <rect x="0" y="120" rx="3" ry="3" width="401" height="6.4" /> <rect x="0" y="140" rx="3" ry="3" width="501" height="6.4" />
                        <circle cx="30" cy="30" r="30" />
                    </content-loader>
                </div>
                <template v-else-if="topics.data.length > 0">
                    <topics-item v-for="item in topics.data" :item="item" :key="item._id"></topics-item>
                    <div class="load-more-wrap">
                        <a v-if="topics.hasNext" @click="loadMore()" href="javascript:;" class="load-more" :class="loading ? 'loading' : ''"
                            >{{ loading ? '加载中' : '更多' }} <i class="icon icon-circle-loading"></i>
                        </a>
                    </div>
                </template>
                <topics-item-none v-else>当前分类还没有文章...</topics-item-none>
            </div>
        </div>
        <div class="main-right">
            <category :category="category"></category>
            <trending :trending="trending"></trending>
            <other></other>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import metaMixin from '@/mixins'

import topicsItem from '../components/topics-item.vue'
import topicsItemNone from '../components/topics-item-none.vue'
import category from '../components/aside-category.vue'
import trending from '../components/aside-trending.vue'
import other from '../components/aside-other.vue'

export default {
    name: 'frontend-index',
    components: {
        ContentLoader,
        topicsItem,
        topicsItemNone,
        category,
        trending,
        other
    },
    mixins: [metaMixin],
    async asyncData({ store, route }, config = { page: 1 }) {
        const {
            params: { id, key, by },
            path
        } = route
        await Promise.all([
            store.dispatch('global/category/getCategoryList'),
            store.dispatch('frontend/article/getTrending'),
            store.dispatch('frontend/article/getArticleList', { ...config, limit: 10, id, path, key, by })
        ])
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        ...mapGetters({
            topics: 'frontend/article/getArticleList',
            category: 'global/category/getCategoryList',
            trending: 'frontend/article/getTrending'
        })
    },
    activated() {
        this.loadMore(1)
    },
    methods: {
        async loadMore(page = this.topics.page + 1) {
            if (this.loading) return
            this.$loading.start()
            this.loading = true
            await this.$options.asyncData({ store: this.$store, route: this.$route }, { page })
            this.loading = false
            this.$loading.finish()
        }
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
            meta: [{ vmid: 'description', name: 'description', content: title }]
        }
    }
}
</script>
