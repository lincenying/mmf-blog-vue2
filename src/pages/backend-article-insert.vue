<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="标题">
                <input type="text" v-model="form.title" placeholder="标题" class="base-input" name="title" />
                <span class="input-info error">请输入标题</span>
            </a-input>
            <a-input title="分类" :classes="'select-item-wrap'">
                <i class="icon icon-arrow-down"></i>
                <select v-model="form.category" class="select-item" name="category">
                    <option value="">请选择分类</option>
                    <option v-for="item in category" :key="item._id" :value="item._id + '|' + item.cate_name">{{ item.cate_name }}</option>
                </select>
                <span class="input-info error">请输入分类</span>
            </a-input>
            <div class="settings-section">
                <div id="post-content" class="settings-item-content">
                    <mavon-editor v-if="renderMD" ref="md" v-model="form.content" @imgAdd="onImgAdd" :subfield="false" :externalLink="externalLink" />
                </div>
            </div>
        </div>
        <div class="settings-footer"><a @click="handleInsert" href="javascript:;" class="btn btn-yellow">添加文章</a></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { showMsg } from '@/utils'
import { uploadApi } from '@/api/upload-api'
// import api from '~api'
import checkAdmin from '@/mixins/check-admin'
import aInput from '../components/_input.vue'

export default {
    name: 'backend-article-insert',
    components: {
        aInput
    },
    mixins: [checkAdmin],
    async asyncData({ store, route }, config = { limit: 99 }) {
        config.all = 1
        await store.dispatch('global/category/getCategoryList', {
            ...config,
            path: route.path
        })
    },
    data() {
        return {
            loading: false,
            renderMD: false,
            form: {
                title: '',
                category: '',
                content: '',
                html: ''
            },
            externalLink: {
                markdown_css: false,
                hljs_js() {
                    // 这是你的hljs文件路径
                    return 'https://cdn.jsdelivr.net/npm/highlightjs/highlight.pack.min.js'
                },
                hljs_css(css) {
                    // 这是你的代码高亮配色文件路径
                    return 'https://cdn.jsdelivr.net/npm/highlightjs/styles/' + css + '.min.css'
                },
                hljs_lang() {
                    // 这是你的代码高亮语言解析路径
                    return false
                },
                katex_css() {
                    // 这是你的katex配色方案路径路径
                    return 'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css'
                },
                katex_js() {
                    // 这是你的katex.js路径
                    return 'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js'
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            category: 'global/category/getCategoryList'
        })
    },
    async mounted() {
        this.renderMD = true
    },
    methods: {
        async onImgAdd(pos, $file) {
            // 第一步.将图片上传到服务器.
            const formdata = new FormData()
            formdata.append('file', $file)
            const { data } = await this.$store.$api.file(uploadApi + '/ajax.php?action=upload', formdata)
            if (data && data.filepath) {
                this.$refs.md.$img2Url(pos, uploadApi + '/' + data.filepath)
            }
        },
        async handleInsert() {
            if (this.loading) return
            if (!this.form.title || !this.form.category || !this.form.content) {
                showMsg('请将表单填写完整!')
                return
            }
            this.loading = true
            // this.form.html = this.$refs.md.d_render
            const { code, data, message } = await this.$store.$api.post('backend/article/insert', this.form)
            this.loading = false
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                this.$store.commit('backend/article/insertArticleItem', data)
                this.$router.push('/backend/article/list')
            }
        }
    },
    metaInfo() {
        return {
            title: '发布文章 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
