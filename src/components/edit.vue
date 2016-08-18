<template>
    <div class="g-mn">
        <div class="box">
            <ajax-form id="article-post" action="/api/?action=modify" method="post" :onFormComplete="onFormComplete">
                <section id="post-title">
                    <input v-model="title" type="text" name="title" class="form-control" placeholder="请输入标题">
                </section>
                <section id="post-category">
                    <select v-model="category" id="category" name="category" class="form-control">
                        <option value="">请选择分类</option>
                        <option value="1">生活</option>
                        <option value="2">工作</option>
                        <option value="3">其他</option>
                    </select>
                </section>
                <section id="post-content">
                    <textarea id="editor" name="content" class="form-control" data-autosave="editor-content"></textarea>
                </section>
                <section id="post-submit">
                    <input type="hidden" name="id" :value="id">
                    <button @click="onSubmit" class="btn btn-success">编辑</button>
                </section>
            </ajax-form>
        </div>
    </div>
</template>

<script lang="babel">
/* global editormd */
import { mapGetters } from 'vuex'
import ajaxForm from './app/ajax-form.vue'
export default {
    ...mapGetters({
        article: 'getAdminArticle'
    }),
    components: {
        ajaxForm
    },
    data () {
        return {
            id: '',
            title: '',
            category: '',
            content: ''
        }
    },
    methods: {
        onSubmit(e) {
            if (this.title === '') {
                this.$store.dispatch('showMsg', '请输入标题')
                e.preventDefault()
            } else if (this.category === '') {
                this.$store.dispatch('showMsg', '请选择分类')
                e.preventDefault()
            } else if ($("#editor").val() === '') {
                this.$store.dispatch('showMsg', '请输入内容')
                e.preventDefault()
            }
        },
        onFormComplete(res) {
            if (res.code === 200) {
                this.$store.commit('UPDATE_ADMIN_ARTICLE', {
                    id: this.id,
                    title: this.title,
                    category: this.category,
                    content: this.content
                })
                this.$store.dispatch('showMsg', {
                    content: res.message, type: "success"
                })
                this.$router.replace('/list/' + this.$route.params.page)
            } else {
                this.$store.dispatch('showMsg', res.message)
            }
        }
    },
    mounted() {
        this.$store.dispatch('getAdminArticle').then(({ data }) => {
            this.id = data._id
            this.title = data.title
            this.category = data.category
            this.content = data.content
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
                markdown: this.content,
                saveHTMLToTextarea : true,
                imageUpload : true,
                imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : "/api/?action=upload"
            })
        })
    }
}
</script>
