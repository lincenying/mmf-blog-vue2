<template>
    <div class="card feed">
        <div class="feed-content">
            <div class="feed-source-time">
                <span class="feed-source"
                    >来自分类 <router-link :to="'/category/' + item.category" v-text="item.category_name" class="feed-minor-link"></router-link
                ></span>
                <span class="feed-time">{{ item.update_date }}</span>
            </div>
            <div class="feed-main-link-wrap"><router-link :to="'/article/' + item._id" v-text="item.title" class="feed-main-link"></router-link></div>
            <div class="feed-desc-wrap"><div class="feed-article-content markdown-body" v-text="item.content"></div></div>
        </div>
        <actions :item="item"></actions>
    </div>
</template>
<script>
import actions from './item-actions.vue'
export default {
    name: 'topics-item',
    components: {
        actions
    },
    props: ['item'],
    data() {
        return {
            showMore: false
        }
    }
}
</script>
