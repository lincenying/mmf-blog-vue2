<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <div class="home-feeds cards-wrap">
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
                    </div>
                    <!-- <div class="settings-footer clearfix">
                        <a href="javascript:;" class="btn btn-blue">保存设置</a>
                    </div> -->
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
import account from '../components/aside-account.vue'
import aInput from '../components/_input.vue'
export default {
    mixins: [metaMixin],
    data() {
        return {
            form: {
                username: '',
                email: ''
            }
        }
    },
    components: {
        account,
        aInput
    },
    methods: {
        async getUser() {
            const { data: { code, data} } = await api.get('frontend/user/account')
            if (code === 200) {
                this.form.username = data.username
                this.form.email = data.email
            }
        }
    },
    mounted() {
        this.getUser()
    },
    metaInfo () {
        return {
            title: '帐号 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
