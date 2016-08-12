<template>
    <div class="index m-post box article">
        <a href="javascript:;" class="w-icon w-icon-1">&nbsp;</a>
        <a href="javascript:;" class="w-icon2">&nbsp;</a>
        <div class="info">
            <a href="javascript:;" v-text="item.creat_date"></a>
        </div>
        <div class="cont cont-1">
            <div class="text">
                <h2><router-link :to="'/article/' + item._id" v-text="item.title"></router-link></h2>
                <div v-if="ispc" class="markdown-body" :class="!showMore ? 'showless' : ''" v-html="item.content"></div>
                <div v-if="ispc" class="more-less">
                    <a v-if="!showMore" @click="open($event)" class="more" href="javascript:;">展开 ↓</a>
                    <a v-else @click="open($event)" class="less" href="javascript:;">收起 ↑</a>
                </div>
            </div>
        </div>
        <div class="info info-1"></div>
    </div>
</template>
<script lang="babel">
    export default {
        props: ['item', 'ispc'],
        data () {
            return {
                showMore: false
            }
        },
        methods: {
            open(e) {
                this.showMore = !this.showMore
                var $mPost = $(e.target).parents(".m-post")
                var offset = $mPost.offset()
                $("body").animate({
                    scrollTop: offset.top
                }, 500 )
            }
        }
    }
</script>
