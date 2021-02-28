<template>
    <div class="main wrap">
        <div class="main-left">
            <!--
                <template v-if="!article.isLoad">
                    <div class="card card-answer">
                        <div class="answer-content">加载中, 请稍等...</div>
                    </div>
                </template>
            -->
            <div v-if="!article.isLoad" class="card card-content-loader">
                <content-loader :height="160" :width="660" :speed="2" primaryColor="#f3f3f3" secondaryColor="#ecebeb">
                    <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" /> <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
                    <rect x="0" y="80" rx="3" ry="3" width="550" height="6.4" /> <rect x="0" y="100" rx="3" ry="3" width="620" height="6.4" />
                    <rect x="0" y="120" rx="3" ry="3" width="401" height="6.4" /> <rect x="0" y="140" rx="3" ry="3" width="501" height="6.4" />
                    <circle cx="30" cy="30" r="30" />
                </content-loader>
            </div>
            <template v-else-if="article.data._id">
                <div class="card card-question-head">
                    <div class="question-content">
                        <router-link
                            :to="'/category/' + article.data.category"
                            v-text="article.data.category_name"
                            class="topic-link-item"
                        ></router-link>
                        <h2 class="question-title">
                            <router-link :to="'/article/' + article.data._id" v-text="article.data.title" class="question-title-link"></router-link>
                        </h2>
                    </div>
                </div>
                <div class="card card-answer">
                    <div class="answer-content"><div class="article-content markdown-body" v-html="addTarget(article.data.html)"></div></div>
                    <actions :item="article.data"></actions>
                </div>
                <comment :comments="comments"></comment>
            </template>
            <template v-else>
                <div class="card card-answer"><div class="answer-content">该文章不存在, 或者该文章已经被删除</div></div>
            </template>
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
import actions from '../components/item-actions.vue'
import category from '../components/aside-category.vue'
import trending from '../components/aside-trending.vue'
import other from '../components/aside-other.vue'
import comment from '../components/frontend-comment.vue'

export default {
    name: 'frontend-article',
    components: {
        ContentLoader,
        actions,
        comment,
        category,
        trending,
        other
    },
    mixins: [metaMixin],
    beforeRouteUpdate(to, from, next) {
        if (to.path !== from.path) this.$options.asyncData({ store: this.$store, route: to })
        next()
    },
    async asyncData({ store, route }) {
        const {
            path,
            params: { id }
        } = route
        await Promise.all([
            store.dispatch('global/category/getCategoryList'),
            store.dispatch('frontend/article/getTrending'),
            store.dispatch(`global/comment/getCommentList`, { id, path, page: 1, limit: 10 }),
            store.dispatch(`frontend/article/getArticleItem`, { id, path })
        ])
    },
    computed: {
        ...mapGetters({
            article: 'frontend/article/getArticleItem',
            comments: 'global/comment/getCommentList',
            category: 'global/category/getCategoryList',
            trending: 'frontend/article/getTrending'
        })
    },
    mounted() {
        // this.$options.asyncData({store: this.$store})
    },
    methods: {
        addTarget(content) {
            if (!content) return ''
            return content.replace(/<a(.*?)href="http/g, '<a$1target="_blank" href="http')
        }
    },
    metaInfo() {
        const title = this.article.data.title ? this.article.data.title + ' - M.M.F 小屋' : 'M.M.F 小屋'
        return {
            title,
            meta: [{ vmid: 'description', name: 'description', content: title }]
        }
    }
}
</script>
