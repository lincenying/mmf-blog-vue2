<template>
    <div class="g-mn">
        <div class="box">
            <ajax-form id="article-post" :action="api" method="post" :complete="onFormComplete">
                <section id="post-title">
                    <input v-model="form.title" type="text" name="title" class="form-control" placeholder="请输入标题">
                </section>
                <section id="post-category">
                    <select v-model="form.category" id="category" name="category" class="form-control">
                        <option value="">请选择分类</option>
                        <option v-for="op in options" :value="op.value" v-text="op.name"></option>
                    </select>
                </section>
                <section id="post-content">
                    <textarea id="editor" name="content" class="form-control" data-autosave="editor-content"></textarea>
                </section>
                <section id="post-submit">
                    <input type="hidden" name="action" value="modify">
                    <input type="hidden" name="id" :value="form._id">
                    <button @click="onSubmit" class="btn btn-success">编辑</button>
                </section>
            </ajax-form>
        </div>
    </div>
</template>

<script lang="babel">
/* global editormd */
import { mapGetters } from 'vuex'
import ajaxForm from '../components/app/ajax-form.vue'
import config from 'api-config'
export default {
    computed: {
        ...mapGetters({
            article: 'getAdminArticle'
        })
    },
    components: {
        ajaxForm
    },
    data () {
        return {
            api: config.api + 'admin/article/modify',
            form: {
                _id: '',
                title: '',
                category: 0,
                content: ''
            },
            options:[{
                value: 1,
                name: '生活'
            }, {
                value: 2,
                name: '工作'
            }, {
                value: 3,
                name: '其他'
            }]
        }
    },
    methods: {
        onSubmit(e) {
            if (this.form.title === '') {
                this.$store.dispatch('showMsg', '请输入标题')
                e.preventDefault()
            } else if (this.form.category === '') {
                this.$store.dispatch('showMsg', '请选择分类')
                e.preventDefault()
            } else if ($("#editor").val() === '') {
                this.$store.dispatch('showMsg', '请输入内容')
                e.preventDefault()
            }
        },
        onFormComplete(res) {
            if (res.code === 200) {
                this.$store.commit('UPDATE_ADMIN_ARTICLE', this.form)
                this.$store.dispatch('showMsg', {
                    content: res.message, type: "success"
                })
                this.$router.replace('/admin/list/' + this.$route.params.page)
            } else {
                this.$store.dispatch('showMsg', res.message)
            }
        }
    },
    mounted() {
        this.$store.dispatch('getAdminArticle').then(({ data }) => {
            this.form = {
                ...data.data
            }
            editormd("post-content", {
                width: "100%",
                height: 500,
                placeholder: '请输入内容...',
                path: '/static/editor.md/lib/',
                toolbarIcons() {
                    return [
                        "bold", "italic", "quote", "|",
                        "list-ul", "list-ol", "hr", "|",
                        "link", "reference-link", "image", "code", "code-block", "table", "|",
                        "watch", "preview", "fullscreen", "|",
                        "help"
                    ]
                },
                watch : false,
                markdown: this.form.content,
                saveHTMLToTextarea : true,
                imageUpload : true,
                imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : config.api + "?action=upload"
            })
        })
    }
}
</script>
