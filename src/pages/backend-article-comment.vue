<template>
    <div class="card">
        <div class="comments">
            <div class="comment-items-wrap">
                <div v-for="item in comments.data" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" class="avatar-img">
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.username }}</a>
                        </span>
                        <div class="comment-content">{{ item.content }}</div>
                        <div class="comment-footer">
                            <span class="comment-time">{{ item.timestamp | timeAgo }}</span>
                            <a v-if="item.is_delete" @click="recover(item._id)" href="javascript:;" class="comment-action-item comment-reply">恢复</a>
                            <a v-else @click="deletes(item._id)" href="javascript:;" class="comment-action-item comment-reply">删除</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="comments.hasNext" class="load-more-wrap">
                <a @click="loadMore()" href="javascript:;" class="comments-load-more">加载更多</a>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
import api from '~api'
import { mapGetters } from 'vuex'
const fetchInitialData = async (store, config = { page: 1 }) => {
    config.all = 1
    await store.dispatch('global/comment/getCommentList', config)
}
export default {
    name: 'backend-article-comment',
    computed: {
        ...mapGetters({
            comments: 'global/comment/getCommentList'
        })
    },
    methods: {
        loadMore(page = this.comments.page + 1) {
            fetchInitialData(this.$store, {page})
        },
        async recover(id) {
            const { data: { code, message} } = await api.get('frontend/comment/recover', { id })
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.$store.commit('global/comment/recoverComment', id)
            }
        },
        async deletes(id) {
            const { data: { code, message} } = await api.get('frontend/comment/delete', { id })
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.$store.commit('global/comment/deleteComment', id)
            }
        }
    },
    mounted() {
        if (this.comments.data.length <= 0) {
            fetchInitialData(this.$store)
        }
    }
}
</script>
