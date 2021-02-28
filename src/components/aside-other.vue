<template>
    <div class="card card-other">
        <div class="card-content">
            <ul class="other-item">
                <li>当前版本: v2.0.4</li>
                <li>项目开源地址: <a href="https://github.com/lincenying/mmf-blog-vue2" target="_blank">单页版(Spa+Pwa)</a></li>
                <li>项目开源地址: <a href="https://github.com/lincenying/mmf-blog-vue2-pwa-ssr" target="_blank">服务端渲染版(Ssr+Pwa)</a></li>
                <li>网站备案号: <a href="http://www.beian.miit.gov.cn" target="_blank">浙ICP备15010753号-1</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'aside-other',
    serverCacheKey: () => {
        return `aside::other`
    }
}
</script>
