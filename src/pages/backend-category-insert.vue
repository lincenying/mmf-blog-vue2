<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="分类名称">
                <input type="text" v-model="form.cate_name" placeholder="分类名称" class="base-input" name="cate_name">
                <span class="input-info error">请输入分类名称</span>
            </a-input>
            <a-input title="分类排序">
                <input type="text" v-model="form.cate_order" placeholder="分类排序" class="base-input" name="cate_order">
                <span class="input-info error">请输入分类排序</span>
            </a-input>
        </div>
        <div class="settings-footer clearfix">
            <a @click="insert" href="javascript:;" class="btn btn-yellow">添加分类</a>
        </div>
    </div>
</template>

<script lang="babel">
import api from '~api'
import aInput from '../components/_input.vue'
export default {
    name: 'backend-category-insert',
    data() {
        return {
            form: {
                cate_name: '',
                cate_order: ''
            }
        }
    },
    components: {
        aInput
    },
    methods: {
        async insert() {
            if (!this.form.cate_name || !this.form.cate_order) {
                this.$store.dispatch('global/showMsg', '请将表单填写完整!')
                return
            }
            const { data: { message, code, data} } = await api.post('backend/category/insert', this.form)
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.$store.commit('global/category/insertCategoryItem', {
                    ...this.form,
                    _id: data
                })
                this.$router.push('/backend/category/list')
            }
        }
    }
}
</script>
