<template>
    <div class="modal-wrap modal-signup-wrap" :class="show ? 'active' : ''">
        <span class="center-helper"></span>
        <div class="modal modal-signup">
            <h2 class="modal-title">注册</h2>
            <a @click="handleClose" href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a>
            <div class="modal-content">
                <div class="signup-form">
                    <div class="input-wrap">
                        <input v-model="form.username" type="text" placeholder="昵称" class="base-input" />
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.email" type="text" placeholder="邮箱" class="base-input" />
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.password" type="password" placeholder="密码" class="base-input" />
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.re_password" type="password" placeholder="重复密码" class="base-input" />
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <a @click="handleRegister" href="javascript:;" class="btn signup-btn btn-yellow">确认注册</a>
                    <a @click="handleLogin" href="javascript:;" class="btn signup-btn btn-blue block">直接登录</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import api from '~api'
import { strlen, showMsg } from '@/utils'

export default {
    name: 'sign-up',
    props: ['show'],
    data() {
        return {
            loading: false,
            form: {
                username: '',
                email: '',
                password: '',
                re_password: ''
            }
        }
    },
    methods: {
        handleClose() {
            this.$store.commit('global/showRegisterModal', false)
        },
        handleLogin() {
            this.$store.commit('global/showLoginModal', true)
            this.$store.commit('global/showRegisterModal', false)
        },
        async handleRegister() {
            if (this.loading) return
            const reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i
            if (!this.form.username || !this.form.password || !this.form.email) {
                showMsg('请将表单填写完整!')
                return
            } else if (strlen(this.form.username) < 4) {
                showMsg('用户长度至少 2 个中文或 4 个英文!')
                return
            } else if (!reg.test(this.form.email)) {
                showMsg('邮箱格式错误!')
                return
            } else if (strlen(this.form.password) < 8) {
                showMsg('密码长度至少 8 位!')
                return
            } else if (this.form.password !== this.form.re_password) {
                showMsg('两次输入的密码不一致!')
                return
            }
            this.loading = true
            const { code, message } = await this.$store.$api.post('frontend/user/insert', this.form)
            this.loading = false
            if (code === 200) {
                showMsg({ type: 'success', content: message })
                this.handleLogin()
            }
        }
    }
}
</script>
