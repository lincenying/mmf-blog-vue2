<template>
    <!--
        <Affix :offset-top="10" class="card-affix"></Affix>
    -->
    <div class="card card-trending">
        <h2 class="card-title">热门文章</h2>
        <div class="card-content">
            <div v-for="(item, index) in trending" :key="item._id" class="trending-item">
                <span class="trending-rank-num">{{ index + 1 }}</span>
                <router-link :to="`/article/${item._id}`" class="trending-title">{{ item.title }}</router-link>
                <div class="trending-meta">
                    <div class="trending-meta-item"><i class="icon icon-action-voteup"></i>{{ item.like }}</div>
                    <div class="trending-meta-item"><i class="icon icon-action-comment"></i>{{ item.comment_count }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Affix from '@/components/affix.vue'

export default {
    name: 'aside-trending',
    components: {
        // Affix
    },
    props: ['trending'],
    serverCacheKey: () => {
        return `aside::trending`
    }
}
</script>
