<template>
    <div class="actions-wrap">
        <a v-if="item.like_status" @click="handleLike" href="javascript:;" class="action-item active"
            ><i class="icon icon-action-voteup-active"></i><span class="text">{{ item.like }} 赞</span></a
        >
        <a v-else @click="handleLike" href="javascript:;" class="action-item"
            ><i class="icon icon-action-voteup"></i><span class="text">{{ item.like }} 赞</span></a
        >
        <a href="javascript:;" class="action-item"
            ><i class="icon icon-action-comment"></i><span class="text">{{ item.comment_count }} 评论</span></a
        >
        <a href="javascript:;" class="action-item action-item-fav"
            ><i class="icon icon-action-fav"></i><span class="text">{{ item.visit }} 浏览</span></a
        >
        <a @click="handleShare" href="javascript:;" class="action-item"><i class="icon icon-action-share"></i><span class="text">分享</span></a>
    </div>
</template>
<script>
import { showMsg } from '@/utils'
// import api from '~api'

export default {
    name: 'item-actions',
    props: ['item'],
    data() {
        return {
            loading: false
        }
    },
    computed: {
        user() {
            return this.$oc(this.$store.state, 'global.cookies.user')
        }
    },
    methods: {
        async handleLike() {
            if (this.loading) return
            if (!this.user) {
                this.$store.commit('global/showLoginModal', true)
                return showMsg('请先登录!')
            }
            let url = 'frontend/like'
            if (this.item.like_status) url = 'frontend/unlike'
            this.loading = true
            const { code, message } = await this.$store.$api.get(url, { id: this.item._id })
            this.loading = false
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                this.$store.commit('frontend/article/modifyLikeStatus', {
                    id: this.item._id,
                    status: !this.item.like_status
                })
            }
        },
        handleShare() {
            const top = window.screen.height / 2 - 250
            const left = window.screen.width / 2 - 300
            const title = this.item.title + ' - M.M.F 小屋'
            const url = 'https://www.mmxiaowu.com/article/' + this.item._id
            window.open(
                'http://service.weibo.com/share/share.php?title=' +
                    encodeURIComponent(title.replace(/&nbsp;/g, ' ').replace(/<br \/>/g, ' ')) +
                    '&url=' +
                    encodeURIComponent(url),
                '分享至新浪微博',
                'height=500, width=600, top=' +
                    top +
                    ', left=' +
                    left +
                    ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
            )
        }
    }
}
</script>
