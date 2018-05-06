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
            <router-link to="/backend/category/list" class="btn btn-blue">返回</router-link>
            <a @click="modify" href="javascript:;" class="btn btn-yellow">编辑分类</a>
        </div>
    </div>
</template>

<script>
// import api from '~api'
import { mapGetters } from 'vuex'
import { showMsg } from '~utils'
import checkAdmin from '~mixins/check-admin'
import aInput from '../components/_input.vue'

export default {
    name: 'backend-category-modify',
    mixins: [checkAdmin],
    async asyncData({ store, route }) {
        await store.dispatch('global/category/getCategoryItem', {
            path: route.path,
            id: route.params.id
        })
    },
    data() {
        return {
            form: {
                id: this.$route.params.id,
                cate_name: '',
                cate_order: ''
            }
        }
    },
    components: {
        aInput
    },
    computed: {
        ...mapGetters({
            item: 'global/category/getCategoryItem'
        })
    },
    methods: {
        async modify() {
            if (!this.form.cate_name || !this.form.cate_order) {
                showMsg('请将表单填写完整!')
                return
            }
            const {
                data: { message, code, data }
            } = await this.$store.$api.post('backend/category/modify', this.form)
            if (code === 200 && data) {
                showMsg({
                    type: 'success',
                    content: message
                })
                this.$store.commit('global/category/updateCategoryItem', data)
                this.$router.push('/backend/category/list')
            }
        }
    },
    mounted() {
        this.form.cate_name = this.item.data.cate_name
        this.form.cate_order = this.item.data.cate_order
    },
    watch: {
        item(val) {
            this.form.cate_name = val.data.cate_name
            this.form.cate_order = val.data.cate_order
        }
    },
    metaInfo() {
        return {
            title: '编辑分类 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
