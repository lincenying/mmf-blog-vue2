<template>
    <div class="modal-wrap modal-signup-wrap" :class="show ? 'active' : ''"><span class="center-helper"></span>
        <div class="modal modal-signup">
            <h2 class="modal-title">注册</h2><a @click="close" href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a>
            <div class="modal-content">
                <div class="signup-form">
                    <div class="input-wrap">
                        <input v-model="form.username" type="text" placeholder="昵称" class="base-input">
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.email" type="text" placeholder="邮箱" class="base-input">
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.password" type="password" placeholder="密码" class="base-input">
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="form.re_password" type="password" placeholder="重复密码" class="base-input">
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <a @click="register" href="javascript:;" class="btn signup-btn btn-yellow">确认注册</a>
                    <a @click="login" href="javascript:;" class="btn signup-btn btn-blue">直接登录</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
import api from '~api'
import { strlen } from '~utils'

export default {
    props: ['show'],
    data() {
        return {
            form: {
                username: '',
                email: '',
                password: '',
                re_password: ''
            }
        }
    },
    methods: {
        close() {
            this.$store.commit('global/showRegisterModal', false)
        },
        login() {
            this.$store.commit('global/showLoginModal', true)
            this.$store.commit('global/showRegisterModal', false)
        },
        async register() {
            if (!this.form.username || !this.form.password || !this.form.email) {
                this.$store.dispatch('global/showMsg', '请将表单填写完整!')
                return
            } else if (strlen(this.form.username) < 4) {
                this.$store.dispatch('global/showMsg', '用户长度至少 2 个中文或 4 个英文!')
                return
            } else if (strlen(this.form.password) < 8) {
                this.$store.dispatch('global/showMsg', '密码长度至少 8 位!')
                return
            } else if (this.form.password !== this.form.re_password) {
                this.$store.dispatch('global/showMsg', '两次输入的密码不一致!')
                return
            }
            const { data: { message, code} } = await api.post('frontend/user/insert', this.form)
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.login()
            }
        }
    }
}
</script>
