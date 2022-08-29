<template>
    <div class="card">
        <div class="comments">
            <div class="comment-post-wrap">
                <img :src="userEmail | avatar" alt="" class="avatar-img" />
                <div class="comment-post-input-wrap base-textarea-wrap">
                    <textarea v-model="form.content" id="content" class="textarea-input base-input" cols="30" rows="4"></textarea>
                </div>
                <div class="comment-post-actions"><a @click="handlePostComment" href="javascript:;" class="btn btn-blue">发表评论</a></div>
            </div>
            <div class="comment-items-wrap">
                <div v-for="item in comments.data" :key="item._id" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img :src="item.userid.email | avatar" alt="" class="avatar-img" />
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.userid.username }}</a>
                        </span>
                        <div class="comment-content" v-text="item.content"></div>
                        <div class="comment-footer">
                            <span class="comment-time" v-text="item.creat_date"></span>
                            <a @click="handleReply(item.userid.username)" href="javascript:;" class="comment-action-item comment-reply">回复</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="comments.hasNext" class="load-more-wrap">
                <a v-if="!loading" @click="loadcomment" href="javascript:;" class="comments-load-more">加载更多</a>
                <a v-else href="javascript:;" class="comments-load-more">加载中...</a>
            </div>
        </div>
    </div>
</template>

<script>
import { showMsg } from '@/utils'
// import api from '~api'

export default {
    name: 'frontend-comment',
    props: ['comments'],
    data() {
        return {
            loading: false,
            postLoading: false,
            form: {
                id: this.$route.params.id,
                content: ''
            }
        }
    },
    computed: {
        user() {
            return this.$oc(this.$store.state, 'global.cookies.user')
        },
        userEmail() {
            return this.$oc(this.$store.state, 'global.cookies.useremail')
        }
    },
    methods: {
        async loadcomment() {
            this.loading = true
            await this.$store.dispatch(`global/comment/getCommentList`, {
                id: this.$route.params.id,
                page: this.comments.page + 1,
                limit: 10
            })
            this.loading = false
        },
        async handlePostComment() {
            if (this.postLoading) return
            if (!this.user) {
                this.$store.commit('global/showLoginModal', true)
                return showMsg('请先登录!')
            }
            if (this.form.content === '') {
                return showMsg('请输入评论内容!')
            }
            this.postLoading = true
            const { code, data } = await this.$store.$api.post('frontend/comment/insert', this.form)
            this.postLoading = false
            if (code === 200) {
                this.form.content = ''
                showMsg({ type: 'success', content: '评论发布成功!' })
                this.$store.commit('global/comment/insertCommentItem', data)
            }
        },
        handleReply(username) {
            this.form.content = '回复 @' + username + ': '
            document.querySelector('#content').focus()
        }
    }
}
</script>
