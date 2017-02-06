<template>
    <div class="card">
        <div class="comments">
            <div class="comment-post-wrap"> <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" class="avatar-img">
                <div class="comment-post-input-wrap base-textarea-wrap">
                    <textarea v-model="form.content" id="content" class="textarea-input base-input" cols="30" rows="4"></textarea>
                </div>
                <div class="comment-post-actions clearfix">
                    <a @click="postComment" href="javascript:;" class="btn btn-blue">发表评论</a>
                </div>
            </div>
            <div class="comment-items-wrap">
                <div v-for="item in comments.data" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img src="//ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg" alt="" class="avatar-img">
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.username }}</a>
                        </span>
                        <div class="comment-content" v-text="item.content"></div>
                        <div class="comment-footer">
                            <span class="comment-time" v-text="item.creat_date"></span>
                            <a @click="reply(item)" href="javascript:;" class="comment-action-item comment-reply">回复</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="comments.hasNext" class="load-more-wrap">
                <a @click="loadcomment()" href="javascript:;" class="comments-load-more">加载更多</a>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
import cookies from 'js-cookie'
import api from '~api'
export default {
    props: ['comments'],
    data () {
        return {
            form: {
                id: this.$route.params.id,
                content: ''
            }
        }
    },
    methods: {
        loadcomment() {
            this.$store.dispatch(`global/comment/getCommentList`, {
                page: this.comments.page + 1,
                limit: 10
            })
        },
        async postComment() {
            const username = cookies.get('user')
            if (!username) {
                this.$store.dispatch('global/showMsg', '请先登录!')
                this.$store.commit('global/showLoginModal', true)
            } else if (this.form.content === '') {
                this.$store.dispatch('global/showMsg', '请输入评论内容!')
            } else {
                const { data: { code, data }} = await api.post('frontend/comment/insert', this.form)
                if (code === 200) {
                    this.form.content = ''
                    this.$store.dispatch('global/showMsg', {
                        content: '评论发布成功!',
                        type: 'success'
                    })
                    this.$store.commit('global/comment/insertCommentItem', data)
                }
            }
        },
        reply(item) {
            this.form.content = '回复 @'+ item.username + ': '
            document.querySelector("#content").focus()
        }
    }
}
</script>
