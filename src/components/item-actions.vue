<template>
    <div class="actions-wrap">
        <a @click="like" href="javascript:;" class="action-item" :class="item.like_status ? 'active' : ''"><i class="icon" :class="item.like_status ? 'icon-action-voteup-active' : 'icon-action-voteup'"></i><span class="text">{{ item.like }} 赞</span></a>
        <a href="javascript:;" class="action-item"><i class="icon icon-action-comment"></i><span class="text">{{ item.comment_count }} 评论</span></a>
        <a href="javascript:;" class="action-item action-item-fav"><i class="icon icon-action-fav"></i><span class="text">{{ item.visit }} 浏览</span></a>
        <a @click="share" href="javascript:;" class="action-item"><i class="icon icon-action-share"></i><span class="text">分享</span></a>
    </div>
</template>
<script lang="babel">
import cookies from 'js-cookie'
import api from '~api'
export default {
    name: 'item-actions',
    serverCacheKey: props => {
        return `frontend::topics::item::actions::${props.item._id}`
    },
    props: ['item'],
    methods: {
        async like() {
            const username = cookies.get('user')
            if (!username) {
                this.$store.dispatch('global/showMsg', '请先登录!')
                this.$store.commit('global/showLoginModal', true)
                return
            }
            let url = 'frontend/like'
            if (this.item.like_status) url = 'frontend/unlike'
            const { data: {code, message} } = await api.get(url, { id: this.item._id })
            if (code === 200) {
                this.$store.commit('frontend/article/modifyLikeStatus', {id: this.item._id, status: !this.item.like_status})
                this.$store.dispatch('global/showMsg', {
                    content: message,
                    type: 'success'
                })
            }
        },
        share() {
            const top = window.screen.height / 2 - 250
            const left = window.screen.width / 2 - 300
            const title = this.item.title + ' - M.M.F 小屋'
            const url = 'https://www.mmxiaowu.com/article/' + this.item._id
            window.open("http://service.weibo.com/share/share.php?title=" + encodeURIComponent(title.replace(/&nbsp;/g, " ").replace(/<br \/>/g, " "))+ "&url=" + encodeURIComponent(url), "分享至新浪微博", "height=500, width=600, top=" + top + ", left=" + left + ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
        }
    }
}
</script>
