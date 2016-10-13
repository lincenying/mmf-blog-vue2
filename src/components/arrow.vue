<template>
    <div class="arrow">
        <a class="go-top" href="javascript:;" @click="goTop"></a>
        <a class="go-back" href="javascript:;" @click="goBack"></a>
    </div>
</template>
<script>
export default {
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goTop() {
            window.scrollTo(0, 0)
        }
    }
}
</script>
