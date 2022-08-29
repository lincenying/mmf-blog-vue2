<template>
    <div class="card card-me">
        <router-link to="/user/account" active-class="active" class="side-entry"
            ><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>帐号</router-link
        >
        <router-link to="/user/password" active-class="active" class="side-entry"
            ><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>密码</router-link
        >
        <a @click="handleLogout" href="javascript:;" class="side-entry"
            ><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>退出</a
        >
    </div>
</template>

<script>
// import api from '~api'

export default {
    name: 'aside-account',
    serverCacheKey: () => {
        return `aside::account`
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async handleLogout() {
            if (this.loading) return
            this.loading = true
            await this.$store.$api.post('frontend/user/logout', {})
            this.loading = false
            window.location.href = '/'
        }
    }
}
</script>
