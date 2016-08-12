<template>
    <div class="g-mn">
    <template v-if="article.data">
        <div class="posts">
            <div class="m-post box article">
                <a href="javascript:;" class="w-icon w-icon-1">&nbsp;</a>
                <a href="javascript:;" class="w-icon2">&nbsp;</a>
                <div class="info">
                    <a href="javascript:;" v-text="article.data.creat_date"></a>
                    <a href="javascript:;">浏览: {{ article.data.visit }}</a>
                    <a href="javascript:;" class="comnum" v-text="article.data.comment_count"></a>
                </div>
                <div class="cont cont-1">
                    <div class="text">
                        <h2><router-link :to="'/article/' + article.data._id" v-text="article.data.title"></router-link></h2>
                        <div class="markdown-body" v-html="article.data.content"></div>
                    </div>
                </div>
                <div class="info info-1"></div>
            </div>
        </div>
        <div class="box m-page box-do">
            <div class="w-icon w-icon-2"></div>
            <div class="w-icon w-icon-3"></div>
            <router-link v-if="article.prev.prev_id" :to="'/article/' + article.prev.prev_id" id="__prev_permalink__" class="prev">上一篇</router-link>
            <span v-else class="prev">上一篇</span>
            <router-link v-if="article.next.next_id" :to="'/article/' + article.next.next_id" id="__next_permalink__" class="next">下一篇</router-link>
            <span v-else class="next">下一篇</span>
        </div>
        <comment></comment>
    </template>
    </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'
import comment from './comment.vue'
const fetchInitialData = async store => {
    await store.dispatch(`getArticle`)
    await store.dispatch(`getComment`, { page: 1, limit: 5})
}
export default {
    computed: {
        ...mapGetters({
            article: 'getArticle'
        })
    },
    components: {
        comment
    },
    methods: {
        loadcomment() {

        }
    },
    mounted() {
        fetchInitialData(this.$store)
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store)
        }
    }
}
</script>
