<template>
    <div class="g-ft">
        <span class="copy"><span title="Copyright">©</span> <a href="/">M·M·F 小屋</a> 2016.06</span>
        <span class="beian"><i></i> <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=000000000000">浙公网安备 000000000000号</a></span>
    </div>
</template>
<script>
export default {
    name: 'copyright',
    serverCacheKey: () => {
        return `components::copyright`
    }
}
</script>
