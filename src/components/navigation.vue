<template>
    <nav class="global-nav">
        <div class="wrap">
            <div class="left-part">
                <router-link to="/" active-class="current" exact class="logo-link"
                    ><i class="icon icon-nav-logo"></i><span class="hidden">M.M.F 小屋</span></router-link
                >
                <div class="main-nav">
                    <router-link to="/" active-class="current" exact class="nav-link"
                        ><i class="icon icon-nav-home"></i><span class="text">首页</span></router-link
                    >
                    <router-link to="/trending/visit" active-class="current" class="nav-link"
                        ><i class="icon icon-nav-explore"></i><span class="text">热门</span></router-link
                    >
                    <router-link to="/about" active-class="current" class="nav-link"
                        ><i class="icon icon-nav-features"></i><span class="text">关于</span></router-link
                    >
                </div>
            </div>
            <div v-if="!backend" class="right-part">
                <span class="nav-search"
                    ><i class="icon icon-search-white"></i><input @keyup.enter="search($event)" placeholder="记得按回车哦" class="nav-search-input"
                /></span>
                <span v-if="isLogin" class="nav-me"
                    ><router-link to="/user/account" class="nav-me-link"><img :src="userEmail | avatar" class="nav-avatar-img" /></router-link
                ></span>
                <span v-else class="nav-me"
                    ><a @click="login" href="javascript:;" class="nav-me-link"><img :src="'noavatar' | avatar" class="nav-avatar-img" /></a
                ></span>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navigation',
    props: ['backend'],
    data() {
        return {}
    },
    computed: {
        userEmail() {
            return this.$oc(this.$store.state, 'global.cookies.useremail')
        },
        isLogin() {
            return !!this.$oc(this.$store.state, 'global.cookies.user')
        }
    },
    methods: {
        login() {
            this.$store.commit('global/showLoginModal', true)
        },
        search(e) {
            var qs = e.target.value
            if (qs === '') {
                return false
            }
            this.$router.replace('/search/' + qs)
        }
    }
}
</script>
