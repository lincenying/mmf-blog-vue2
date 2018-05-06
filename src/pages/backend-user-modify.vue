<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="昵称">
                <input type="text" v-model="form.username" placeholder="昵称" class="base-input" name="username">
                <span class="input-info error">请输入昵称</span>
            </a-input>
            <a-input title="邮箱">
                <input type="text" v-model="form.email" placeholder="邮箱" class="base-input" name="email">
                <span class="input-info error">请输入邮箱</span>
            </a-input>
            <a-input title="密码">
                <input type="password" v-model="form.password" placeholder="密码" class="base-input" name="password">
                <span class="input-info error">请输入密码</span>
            </a-input>
        </div>
        <div class="settings-footer clearfix">
            <router-link to="/backend/user/list" class="btn btn-blue">返回</router-link>
            <a @click="modify" href="javascript:;" class="btn btn-yellow">编辑用户</a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { showMsg } from '~utils'
// import api from '~api'
import checkAdmin from '~mixins/check-admin'
import aInput from '~components/_input.vue'

export default {
    name: 'backend-user-modify',
    mixins: [checkAdmin],
    async asyncData({ store, route }) {
        await store.dispatch('backend/user/getUserItem', {
            id: route.params.id,
            path: route.path
        })
    },
    data() {
        return {
            form: {
                id: this.$route.params.id,
                username: '',
                email: '',
                password: ''
            }
        }
    },
    components: {
        aInput
    },
    computed: {
        ...mapGetters({
            item: 'backend/user/getUserItem'
        })
    },
    methods: {
        async modify() {
            if (!this.form.username || !this.form.email) {
                showMsg('请将表单填写完整!')
                return
            }
            const {
                data: { message, code, data }
            } = await this.$store.$api.post('backend/user/modify', this.form)
            if (code === 200) {
                showMsg({
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/user/updateUserItem', data)
                this.$router.push('/backend/user/list')
            }
        }
    },
    mounted() {
        this.form.username = this.item.data.username
        this.form.email = this.item.data.email
    },
    watch: {
        item(val) {
            this.form.username = val.data.username
            this.form.email = val.data.email
        }
    },
    metaInfo() {
        return {
            title: '用户编辑 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
