<template>
    <div>
        <div class="box m-tit">
            <h1><a @click="slideToggle" href="javascript:;"></a></h1>
            <a @click="slideToggle" href="javascript:;" class="w-icon">查看个人介绍</a>
            <a href="https://github.com/lincenying/mmf-blog-vue2-ssr" class="github" target="_blank"></a>
        </div>
        <div class="box box-do m-about">
            <div class="logo">
                <a href="javascript:;"><img src="http://ww2.sinaimg.cn/large/005uQRNCgw1f4ij3dy4pmj302o02odfo.jpg"></a>
            </div>
            <p>姓名: 林岑影</p>
            <p>年龄: 1987.09</p>
            <p>职业: 前端开发 | Github: <a href="https://github.com/lincenying" target="_blank">@lincenying</a></p>
            <p>技能: HTML5 + CSS3 + NodeJS + React + Vue + ES6 + Gulp + WebPack + jQuery + PHP</p>
            <a @click="slideToggle" href="javascript:;" class="w-icon">收起个人介绍</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'about',
    methods: {
        slideToggle() {
            $(".m-about").slideToggle("800")
        }
    },
    serverCacheKey: () => {
        return `components::about`
    }
}
</script>
<style media="screen">
.github {
    position: absolute;
    right: 25px;
    top: 25px;
    background: url(http://ww1.sinaimg.cn/large/005uQRNCgw1f9txgzja9sj303c03c746.jpg);
    background-size: cover;
    display: inline-block;
    width: 52px;
    height: 52px;
}
</style>
