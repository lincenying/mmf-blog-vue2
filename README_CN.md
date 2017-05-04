# mmf-blog vuejs 2.0 v2版

demo: [http://vue2.mmxiaowu.com](http://vue2.mmxiaowu.com)

#### 说明

本站采用 Vue2, Vue-Router, Vuex 搭建

网站分成前台和后台, 采用 SPA 模式构建

主要功能包括: 管理员, 用户, 分类, 文章, 评论, 文章点赞

主要技术栈: vue2, vue2-router, vuex, webpack, babel, eslint

---

#### 其他版本

react spa版本: [https://github.com/lincenying/mmf-blog-react-v2](https://github.com/lincenying/mmf-blog-react-v2)

vue2 spa版本: [https://github.com/lincenying/mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)

vue2 ssr版本: [https://github.com/lincenying/mmf-blog-vue2-ssr](https://github.com/lincenying/mmf-blog-vue2-ssr)

---

先安装 api server:

koa2版: https://github.com/lincenying/mmf-blog-api-koa2-v2

express版: https://github.com/lincenying/mmf-blog-api-v2

```bash
# 安装依赖
yarn  #or  npm install
# 注意: 不要用 cnpm 安装依赖

# 生产模式
npm run build

# 开发模式
npm run dev
```

首页
http://localhost:8080

登录
http://localhost:8080/backend

# 注意:
由于`babelrc`配置了

```javascript
"presets": [
    ["env", {
        "targets": {
            "chrome": 52
        }
    }]
]
```
所以, 在开发环境下, 请用 chrome52+ 打开, 如果需要其他低版本浏览器, 请自行修改根目录的`.babelrc`文件

# LICENSE

MIT
