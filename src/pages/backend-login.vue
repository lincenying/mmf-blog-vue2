<template>
    <div class="main wrap clearfix">
        <div class="home-feeds cards-wrap">
            <div class="settings-main card">
                <div class="settings-main-content">
                    <a-input title="昵称">
                        <input type="text" v-model="form.username" placeholder="昵称" class="base-input" name="username">
                        <span class="input-info error">请输入昵称</span>
                    </a-input>
                    <a-input title="密码">
                        <input type="password" v-model="form.password" placeholder="密码" class="base-input" name="password">
                        <span class="input-info error">请输入密码</span>
                    </a-input>
                </div>
                <div class="settings-footer clearfix">
                    <a @click="login" href="javascript:;" class="btn btn-yellow">登录</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cookies from 'js-cookie'
import { showMsg } from '~utils'
// import api from '~api'
import aInput from '~components/_input.vue'
export default {
    name: 'backend-login',
    beforeRouteEnter(to, from, next) {
        if (cookies.get('b_user')) {
            window.location.href = '/backend/article/list'
        }
        next()
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    components: {
        aInput
    },
    methods: {
        async login() {
            if (!this.form.username || !this.form.password) {
                showMsg('请输入用户名和密码!')
                return
            }
            const {
                data: { data, code }
            } = await this.$store.$api.post('backend/admin/login', this.form)
            if (data && code === 200) {
                window.location.href = '/backend/article/list'
            }
        }
    },
    metaInfo() {
        return {
            title: '管理员登录 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
