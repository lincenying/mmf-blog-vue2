<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="分类名称">
                <input type="text" v-model="form.cate_name" placeholder="分类名称" class="base-input" name="cate_name" />
                <span class="input-info error">请输入分类名称</span>
            </a-input>
            <a-input title="分类排序">
                <input type="text" v-model="form.cate_order" placeholder="分类排序" class="base-input" name="cate_order" />
                <span class="input-info error">请输入分类排序</span>
            </a-input>
        </div>
        <div class="settings-footer"><a @click="handleInsert" href="javascript:;" class="btn btn-yellow">添加分类</a></div>
    </div>
</template>

<script>
import { showMsg } from '@/utils'
// import api from '~api'
import checkAdmin from '@/mixins/check-admin'
import aInput from '../components/_input.vue'

export default {
    name: 'backend-category-insert',
    components: {
        aInput
    },
    mixins: [checkAdmin],
    data() {
        return {
            loading: false,
            form: {
                cate_name: '',
                cate_order: ''
            }
        }
    },
    methods: {
        async handleInsert() {
            if (this.loading) return
            if (!this.form.cate_name || !this.form.cate_order) {
                showMsg('请将表单填写完整!')
                return
            }
            this.loading = true
            const { code, data, message } = await this.$store.$api.post('backend/category/insert', this.form)
            this.loading = false
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                this.$store.commit('global/category/insertCategoryItem', {
                    ...this.form,
                    _id: data
                })
                this.$router.push('/backend/category/list')
            }
        }
    },
    metaInfo() {
        return {
            title: '添加分类 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
