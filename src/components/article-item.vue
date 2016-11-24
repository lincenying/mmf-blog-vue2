<template>
    <div>
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
                        <div class="markdown-body" v-html="addTarget(article.data.html)"></div>
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
    </div>
</template>
<script lang="babel">
    export default {
        name: 'article-item',
        props: ['article'],
        data () {
            return {
                showMore: false
            }
        },
        methods: {
            addTarget(content) {
                if (!content) return ''
                return content.replace(/<a(.*?)href=/g, '<a$1target="_blank" href=')
            }
        },
        serverCacheKey: props => {
            return `${ props.article.data._id }::${ props.article.data.creat_date }`
        }
    }
</script>
