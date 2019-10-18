<template>
    <div v-if="loading" class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
    </div>
</template>

<script>
export default {
    name: 'loading-spinner',
    props: ['loading']
}
</script>
