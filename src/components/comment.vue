<template>
    <div class="box">
        <div class="comment">
            <div class="nctitle">评论</div>
            <div class="bcmt">
                <div class="s-fc0 ztag ztag_tips">由于该用户的权限设置，您暂时无法进行评论...</div>
                <div class="bcmtadd">
                    <input v-model="form.username" type="text" class="form-control" placeholder="请输入昵称">
                    <textarea id="content" v-model="form.content" class="form-control" placeholder="请输入评论内容"></textarea>
                    <div class="bcmtbtn">
                        <span class="ztag ztag_tips">提示</span>
                        <button @click="postComment" class="s-bd1 s-fc1 s-bg1 ztag">发布</button>
                        <div class="txt s-fc0"></div>
                    </div>
                </div>
                <div class="bcmtlst">
                    <ul class="clearfix ztag">
                        <li v-for="item in comments.list" class="s-bd2 s-bg2">
                            <div class="bcmtlsta clearfix">
                                <div class="bcmtlstb">
                                    <a href="javascript:;" :title="item.username"><img class="itag" src="http://ww2.sinaimg.cn/large/005uQRNCgw1f4ij3d8m05j301s01smwx.jpg"></a>
                                </div>
                                <div class="bcmtlstc">
                                    <div class="bcmtlstd clearfix">
                                        <div class="bcmtlste clearfix">
                                            <div class="bcmtlstg">
                                                <div class="bcmtlsti">
                                                    <div class="bcmtlstj">
                                                        <a class="s-fc2 itag bcmtlstk" href="javascript:;" :title="item.username" v-text="item.username"></a>
                                                        <span v-if="item.reply_user" class="s-fc3 itag">回复了&nbsp;&nbsp;
                                                            <a href="javascript:;" class="s-fc2 itag" v-text="item.reply_user"></a>
                                                        </span>
                                                        <span class="bcmtlstf s-fc4">：</span>
                                                        <span class="bcmtlstf s-fc4 itag" v-text="item.content"></span></div>
                                                </div>
                                            </div>
                                            <div class="bcmtlsth">
                                                <a class="s-fc2 itag" href="javascript:;" style="visibility: hidden;">删除</a><a @click="reply(item)" class="s-fc2 itag" href="javascript:;">回复</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="bcmtmore s-bd2 ztag" style="display: none;">
                    <div class="bcmtlsta"><span class="s-fc4">正在载入中...</span></div>
                </div>
                <div v-if="comments.hasNext" class="bcmtmore s-bd2">
                    <div class="bcmtlsta"><a @click="loadcomment()" href="javascript:;" class="s-fc2 ztag">查看更多</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            comments: 'getComment'
        })
    },
    data () {
        return {
            form: {
                username: '',
                content: ''
            }
        }
    },
    methods: {
        loadcomment() {
            this.$store.dispatch(`getComment`, {
                page: this.comments.page + 1,
                limit: 5
            })
        },
        postComment() {
            if (this.form.content === '') {
                this.$store.dispatch('showMsg', '请输入评论内容!')
            } else {
                this.$store.dispatch('postComment', {
                    action: 'postComment',
                    id: this.$route.params.id,
                    content: this.form.content,
                    username: this.form.username
                }).then(({code, message}) => {
                    if (code === 200) {
                        this.form.content = ''
                        this.form.username = ''
                        this.$store.dispatch('showMsg', {
                            content: '评论发布成功!',
                            type: 'success'
                        })
                    } else {
                        this.$store.dispatch('showMsg', message)
                    }
                })
            }
        },
        reply(item) {
            this.form.content = '回复 @'+ item.username + ': '
            document.querySelector("#content").focus()
        }
    }
}
</script>
