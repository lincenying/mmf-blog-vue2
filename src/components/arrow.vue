<template>
    <div class="arrow">
        <a class="go-top" href="javascript:;" @click="goTop"></a>
        <a class="go-back" href="javascript:;" @click="goBack"></a>
    </div>
</template>
<script>
export default {
    name: 'arrow',
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goTop() {
            window.scrollTo(0, 0)
        }
    },
    serverCacheKey: () => {
        return `components::arrow`
    }
}
</script>
