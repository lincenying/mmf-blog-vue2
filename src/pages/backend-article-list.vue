<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-title">标题</div>
                <div class="list-category">分类</div>
                <div class="list-date">最后更新</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in topics.data" class="list-section">
                <div class="list-title">{{ item.title }}</div>
                <div class="list-category">{{ item.category_name }}</div>
                <div class="list-date">{{ item.update_date | timeAgo }}</div>
                <div class="list-action">
                    <router-link :to="'/backend/article/modify/' + item._id" class="badge badge-success">编辑</router-link>
                    <a v-if="item.is_delete" @click="recover(item._id)" href="javascript:;">恢复</a>
                    <a v-else @click="deletes(item._id)" href="javascript:;">删除</a>
                    <router-link v-if="item.comment_count > 0" :to="'/backend/article/comment/' + item._id" class="badge badge-success">评论</router-link>
                </div>
            </div>
        </div>
        <div v-if="topics.hasNext" class="settings-footer clearfix">
            <a @click="loadMore()" class="admin-load-more" href="javascript:;">加载更多</a>
        </div>
    </div>
</template>

<script lang="babel">
import api from '~api'
import { mapGetters } from 'vuex'
const fetchInitialData = async (store, config = { page: 1}) => {
    await store.dispatch('backend/article/getArticleList', config)
}
export default {
    name: 'backend-article-list',
    computed: {
        ...mapGetters({
            topics: 'backend/article/getArticleList'
        })
    },
    methods: {
        loadMore(page = this.topics.page + 1) {
            fetchInitialData(this.$store, {page})
        },
        async recover(id) {
            const { data: { code, message} } = await api.get('backend/article/recover', { id })
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/article/recoverArticle', id)
            }
        },
        async deletes(id) {
            const { data: { code, message} } = await api.get('backend/article/delete', { id })
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/article/deleteArticle', id)
            }
        }
    },
    mounted() {
        if (this.topics.data.length <= 0) {
            fetchInitialData(this.$store)
        }
    }
}
</script>
