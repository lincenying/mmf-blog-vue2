<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <div class="settings-main card">
                    <div class="settings-main-content">
                        <a-input title="昵称">
                            <input type="text" :value="username" placeholder="昵称" class="base-input" name="username" readonly />
                            <span class="input-info error">请输入昵称</span>
                        </a-input>
                        <a-input title="邮箱">
                            <input type="text" v-model="form.email" placeholder="邮箱" class="base-input" name="email" />
                            <span class="input-info error">请输入邮箱</span>
                        </a-input>
                    </div>
                    <div class="settings-footer">
                        <a @click="handleSubmit" href="javascript:;" class="btn btn-yellow">保存设置</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right"><account></account></div>
    </div>
</template>

<script>
// import api from '~api'
import { showMsg } from '@/utils'
import metaMixin from '@/mixins'
import checkUser from '@/mixins/check-user'
import account from '../components/aside-account.vue'
import aInput from '../components/_input.vue'

export default {
    name: 'frontend-user-account',
    components: {
        account,
        aInput
    },
    mixins: [metaMixin, checkUser],
    data() {
        return {
            username: '',
            form: {
                email: ''
            }
        }
    },
    mounted() {
        this.getUser()
    },
    methods: {
        async getUser() {
            const { code, data } = await this.$store.$api.get('frontend/user/account')
            if (code === 200) {
                this.username = data.username
                this.form.email = data.email
            }
        },
        async handleSubmit() {
            const reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i
            if (!this.form.email) {
                showMsg('请填写邮箱地址!')
                return
            } else if (!reg.test(this.form.email)) {
                showMsg('邮箱格式错误!')
                return
            }
            const { code, data } = await this.$store.$api.post('frontend/user/account', {
                ...this.form,
                username: this.username,
                id: this.$oc(this.$store.state, 'global.cookies.userid')
            })
            if (code === 200) {
                this.$store.commit('global/setCookies', {
                    ...this.$oc(this.$store.state, 'global.cookies'),
                    useremail: this.form.email
                })
                showMsg({
                    type: 'success',
                    content: data
                })
            }
        }
    },
    metaInfo() {
        return {
            title: '帐号 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
