<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
                <div class="settings-main card">
                    <div class="settings-main-content">
                        <a-input title="当前密码">
                            <input type="password" v-model="form.old_password" placeholder="当前密码" class="base-input" name="old_password">
                        </a-input>
                        <a-input title="新的密码">
                            <input type="password" v-model="form.password" placeholder="新的密码" class="base-input" name="password">
                        </a-input>
                        <a-input title="确认密码">
                            <input type="password" v-model="form.re_password" placeholder="确认密码" class="base-input" name="re_password">
                        </a-input>
                    </div>
                    <div class="settings-footer clearfix">
                        <a @click="modify" href="javascript:;" class="btn btn-yellow">保存设置</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right">
            <account></account>
        </div>
    </div>
</template>

<script lang="babel">
import api from '~api'
import metaMixin from '~mixins'
import account from '~components/aside-account.vue'
import aInput from '~components/_input.vue'
export default {
    mixins: [metaMixin],
    data() {
        return {
            form: {
                old_password: '',
                password: '',
                re_password: ''
            }
        }
    },
    components: {
        aInput,
        account
    },
    methods: {
        async modify() {
            if (!this.form.password || !this.form.old_password || !this.form.re_password) {
                this.$store.dispatch('global/showMsg', '请将表单填写完整!')
                return
            } else if (this.form.password !== this.form.re_password) {
                this.$store.dispatch('global/showMsg', '两次密码输入不一致!')
                return
            }
            const { data: { code, data} } = await api.post('frontend/user/password', this.form)
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: data
                })
                this.form.old_password = ''
                this.form.password = ''
                this.form.re_password = ''
            }
        }
    },
    mounted() {
        this.$store.dispatch('global/gProgress', 100)
    },
    metaInfo () {
        return {
            title: '密码 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
