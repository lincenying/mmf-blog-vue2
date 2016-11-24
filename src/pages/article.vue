<template>
    <div class="g-mn">
        <template v-if="article.data">
            <article-item :article="article"></article-item>
            <comment></comment>
        </template>
    </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'
import articleItem from '../components/article-item.vue'
import comment from '../components/comment.vue'
const fetchInitialData = async store => {
    await store.dispatch(`getArticle`)
    await store.dispatch(`getComment`, { page: 1, limit: 5})
}
export default {
    prefetch: fetchInitialData,
    computed: {
        ...mapGetters({
            article: 'getArticle'
        })
    },
    components: {
        articleItem,
        comment
    },
    mounted() {
        if (this.$route.path !== this.article.path) {
            fetchInitialData(this.$store)
        } else {
            this.$store.dispatch('gProgress', 100)
        }
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store)
        }
    }
}
</script>
