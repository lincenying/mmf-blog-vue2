<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="标题">
                <input type="text" v-model="form.title" placeholder="标题" class="base-input" name="title">
                <span class="input-info error">请输入标题</span>
            </a-input>
            <a-input title="分类" :classes="'select-item-wrap'">
                <i class="icon icon-arrow-down"></i>
                <select v-model="form.category" class="select-item" name="category">
                    <option value="">请选择分类</option>
                    <option v-for="item in category" :value="item._id + '|' + item.cate_name">{{ item.cate_name }}</option>
                </select>
                <span class="input-info error">请输入分类</span>
            </a-input>
            <div class="settings-section">
                <div id="post-content" class="settings-item-content">
                    <textarea id="editor" name="content" class="form-control hidden" data-autosave="editor-content"></textarea>
                </div>
            </div>
        </div>
        <div class="settings-footer clearfix">
            <a @click="insert" href="javascript:;" class="btn btn-yellow">添加文章</a>
        </div>
    </div>
</template>

<script lang="babel">
/* global postEditor */
import api from '~api'
import { mapGetters } from 'vuex'
import aInput from '../components/_input.vue'
const fetchInitialData = async (store, config = { limit: 99}) => {
    await store.dispatch('global/category/getCategoryList', config)
}
export default {
    name: 'backend-article-insert',
    data() {
        return {
            form: {
                title: '',
                category: '',
                content: ''
            }
        }
    },
    components: {
        aInput
    },
    computed: {
        ...mapGetters({
            category: 'global/category/getCategoryList'
        })
    },
    methods: {
        async insert() {
            const content = postEditor.getMarkdown()
            if (!this.form.title || !this.form.category || !content) {
                this.$store.dispatch('global/showMsg', '请将表单填写完整!')
                return
            }
            this.form.content = content
            const { data: { message, code, data} } = await api.post('backend/article/insert', this.form)
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/article/insertArticleItem', data)
                this.$router.push('/backend/article/list')
            }
        }
    },
    mounted() {
        if (this.category.length <= 0) {
            fetchInitialData(this.$store)
        }
        // eslint-disable-next-line
        window.postEditor = editormd("post-content", {
            width: "100%",
            height: 500,
            markdown: "",
            placeholder: '请输入内容...',
            path: '/static/editor.md/lib/',
            toolbarIcons() {
                return [
                    "bold", "italic", "quote", "|",
                    "list-ul", "list-ol", "hr", "|",
                    "link", "reference-link", "image", "code", "table", "|",
                    "watch", "preview", "fullscreen"
                ]
            },
            watch : false,
            saveHTMLToTextarea : true
        })
    }
}
</script>
