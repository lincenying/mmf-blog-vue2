<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <template v-if="!article.isLoad">
                <div class="card card-answer">
                    <div class="answer-content">加载中, 请稍等...</div>
                </div>
            </template>
            <template v-else-if="article.data._id">
                <div class="card card-question-head">
                    <div class="question-content">
                        <router-link :to="'/category/' + article.data.category" v-text="article.data.category_name" class="topic-link-item"></router-link>
                        <h2 class="question-title"><router-link :to="'/article/' + article.data._id" v-text="article.data.title" class="question-title-link"></router-link></h2>
                    </div>
                </div>
                <div class="card card-answer">
                    <div class="answer-content">
                        <div class="article-content markdown-body" v-html="addTarget(article.data.html)"></div>
                    </div>
                    <actions :item="article.data"></actions>
                </div>
                <comment :comments="comments"></comment>
            </template>
            <template v-else>
                <div class="card card-answer">
                    <div class="answer-content">该文章不存在, 或者该文章已经被删除</div>
                </div>
            </template>
        </div>
        <div class="main-right">
            <category :category="category"></category>
            <trending :trending="trending"></trending>
        </div>
    </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'
import metaMixin from '~mixins'
import actions from '../components/item-actions.vue'
import category from '../components/aside-category.vue'
import trending from '../components/aside-trending.vue'
import comment from '../components/frontend-comment.vue'
const fetchInitialData = async store => {
    store.dispatch('global/category/getCategoryList')
    store.dispatch('frontend/article/getTrending')
    store.dispatch(`global/comment/getCommentList`, { page: 1, limit: 5})
    await store.dispatch(`frontend/article/getArticleItem`)
}
export default {
    name: 'frontend-article',
    prefetch: fetchInitialData,
    mixins: [metaMixin],
    beforeRouteUpdate(to, from, next) {
        if (to.path !== from.path) fetchInitialData(this.$store)
        else this.$store.dispatch('global/gProgress', 100)
        next()
    },
    computed: {
        ...mapGetters({
            article: 'frontend/article/getArticleItem',
            comments: 'global/comment/getCommentList',
            category: 'global/category/getCategoryList',
            trending: 'frontend/article/getTrending'
        })
    },
    components: {
        actions,
        comment,
        category,
        trending
    },
    methods: {
        addTarget(content) {
            if (!content) return ''
            return content.replace(/<a(.*?)href="http/g, '<a$1target="_blank" href="http')
        }
    },
    mounted() {
        fetchInitialData(this.$store)
    },
    metaInfo () {
        const title = this.article.data.title ? this.article.data.title + ' - M.M.F 小屋' : 'M.M.F 小屋'
        return {
            title,
            meta: [{ vmid: 'description', name: 'description', content: title }]
        }
    }
}
</script>
