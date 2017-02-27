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

<script lang="babel">
import api from '~api'
import { mapGetters } from 'vuex'
import aInput from '../components/_input.vue'
const fetchInitialData = async store => {
    await store.dispatch('global/category/getCategoryItem')
}
export default {
    name: 'backend-category-modify',
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
                this.$store.dispatch('global/showMsg', '请将表单填写完整!')
                return
            }
            const { data: { message, code, data} } = await api.post('backend/category/modify', this.form)
            if (code === 200 && data) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.$store.commit('global/category/updateCategoryItem', data)
                this.$router.push('/backend/category/list')
            }
        }
    },
    mounted() {
        if (!this.item._id || this.item.path !== this.$route.path) {
            fetchInitialData(this.$store)
        } else {
            this.form.cate_name = this.item.cate_name
            this.form.cate_order = this.item.cate_order
        }
    },
    watch: {
        item(val) {
            this.form.cate_name = val.cate_name
            this.form.cate_order = val.cate_order
        }
    }
}
</script>
