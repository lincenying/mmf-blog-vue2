<template>
    <div class="g-mn">
        <div class="box">
            <ajax-form id="article-post" action="/api/" method="post" :complete="onFormComplete">
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
                    <textarea v-model="content" id="editor" name="content" class="form-control hidden" data-autosave="editor-content"></textarea>
                </section>
                <section id="post-submit">
                    <input type="hidden" name="action" value="post">
                    <button @click="onSubmit" class="btn btn-success">发布</button>
                </section>
            </ajax-form>
        </div>
    </div>
</template>

<script lang="babel">
    /* global window, editormd, testEditor */
    import ajaxForm from 'vue2-ajax-form'
    export default {
        components: {
            ajaxForm
        },
        data () {
            return {
                editors: null,
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
                this.$store.dispatch('showMsg', {
                    content: res.message,
                    type: res.code === 200 ? "success" : 'error'
                })
                if (res.code === 200) {
                    $("#article-post").get(0).reset()
                    testEditor.clear()
                }
            }
        },
        mounted() {
            window.testEditor = editormd("post-content", {
                width: "100%",
                height: 500,
                markdown: "",
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
                saveHTMLToTextarea : true,
                imageUpload : true,
                imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : "/api/?action=upload"
            })
            this.$store.dispatch('gProgress', 100)
        }
    }
</script>
