<template>
    <div class="actions-wrap">
        <a v-if="item.like_status" @click="like" href="javascript:;" class="action-item active"><i class="icon icon-action-voteup-active"></i><span class="text">{{ item.like }} 赞</span></a>
        <a v-else @click="like" href="javascript:;" class="action-item"><i class="icon icon-action-voteup"></i><span class="text">{{ item.like }} 赞</span></a>
        <a href="javascript:;" class="action-item"><i class="icon icon-action-comment"></i><span class="text">{{ item.comment_count }} 评论</span></a>
        <a href="javascript:;" class="action-item action-item-fav"><i class="icon icon-action-fav"></i><span class="text">{{ item.visit }} 浏览</span></a>
        <a @click="share" href="javascript:;" class="action-item"><i class="icon icon-action-share"></i><span class="text">分享</span></a>
    </div>
</template>
<script>
import cookies from 'js-cookie'
import { showMsg } from '~utils'
// import api from '~api'
export default {
    name: 'item-actions',
    props: ['item'],
    methods: {
        async like() {
            const username = cookies.get('user')
            if (!username) {
                showMsg('请先登录!')
                this.$store.commit('global/showLoginModal', true)
                return
            }
            let url = 'frontend/like'
            if (this.item.like_status) url = 'frontend/unlike'
            const {
                data: { code, message }
            } = await this.$store.$api.get(url, { id: this.item._id })
            if (code === 200) {
                showMsg({
                    content: message,
                    type: 'success'
                })
                this.$store.commit('frontend/article/modifyLikeStatus', {
                    id: this.item._id,
                    status: !this.item.like_status
                })
            }
        },
        share() {
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
