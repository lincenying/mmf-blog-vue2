<template>
    <div class="card">
        <div class="comments">
            <div class="comment-items-wrap">
                <div v-for="item in comments.data" :key="item._id" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img :src="item.email | avatar" alt="" class="avatar-img" />
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
                <a v-if="!loading" @click="loadMore()" href="javascript:;" class="comments-load-more">加载更多</a>
                <a v-else href="javascript:;" class="comments-load-more">加载中...</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { showMsg } from '@/utils'
// import api from '~api'
import checkAdmin from '@/mixins/check-admin'

export default {
    name: 'backend-article-comment',
    mixins: [checkAdmin],
    async asyncData({ store, route }, config = { page: 1 }) {
        config.all = 1
        config.id = route.params.id
        await store.dispatch('global/comment/getCommentList', {
            ...config,
            path: route.path
        })
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        ...mapGetters({
            comments: 'global/comment/getCommentList'
        })
    },
    mounted() {},
    methods: {
        async loadMore(page = this.comments.page + 1) {
            this.loading = true
            await this.$options.asyncData({ store: this.$store, route: this.$route }, { page })
            this.loading = false
        },
        async recover(id) {
            const { code, message } = await this.$store.$api.get('frontend/comment/recover', { id })
            if (code === 200) {
                showMsg({
                    type: 'success',
                    content: message
                })
                this.$store.commit('global/comment/recoverComment', id)
            }
        },
        async deletes(id) {
            const { code, message } = await this.$store.$api.get('frontend/comment/delete', { id })
            if (code === 200) {
                showMsg({
                    type: 'success',
                    content: message
                })
                this.$store.commit('global/comment/deleteComment', id)
            }
        }
    },
    metaInfo() {
        return {
            title: '评论列表 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
