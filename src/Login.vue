<template>
    <section class="container">
        <div class="login">
            <h1>后台管理</h1>
            <ajax-form id="shake-setting" :action="api" method="post" :complete="onFormComplete">
                <p><input v-model="form.username" type="text" name="username" value="" placeholder="请输入用户名"></p>
                <p><input v-model="form.password" type="password" name="password" value="" placeholder="请输入密码"></p>
                <p class="remember_me">
                    <label>
                        <input v-model="form.remember_me" type="checkbox" name="remember_me" id="remember_me">
                        <input value="login" type="hidden" name="action" id="action">
                        保持登录
                    </label>
                </p>
                <p class="submit"><input type="submit" value="登录" :disabled="form.usrname != '' && form.password != '' ? null: 'true'"></p>
            </ajax-form>
        </div>
    </section>
</template>
<script lang="babel">
    /* global window */
    import './assets/css/login.css'
    import '../node_modules/toastr/build/toastr.css'
    import config from './config'
    import { mapGetters } from 'vuex'
    import ls from 'store2'
    import ajaxForm from 'vue2-ajax-form'
    export default {
        computed: {
            ...mapGetters({
                global: 'getGlobal'
            })
        },
        components: {
            ajaxForm
        },
        data() {
            return {
                api: config.api,
                form: {
                    username: '',
                    password: '',
                    remember_me: ''
                }
            }
        },
        methods: {
            onFormComplete(res) {
                if (res.code === 200) {
                    this.$store.dispatch('showMsg', {
                        content: '登录成功', type: "success"
                    })
                    ls.set("token", res.data)
                    setTimeout(() => {
                        window.location.href = "/admin/post"
                    }, 1000)
                } else {
                    this.$store.dispatch('showMsg', res.message)
                }
            }
        }
    }
</script>
