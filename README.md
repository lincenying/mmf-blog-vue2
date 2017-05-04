# mmf-blog vuejs 2.0 v2         [中文说明](https://github.com/lincenying/mmf-blog-vue2/blob/master/README_CN.md)

demo: [http://vue2.mmxiaowu.com](http://vue2.mmxiaowu.com)

The main technical stack: vue2, vue2-router, vuex, webpack, babel, eslint

---

#### Other versions

react(spa): [https://github.com/lincenying/mmf-blog-react-v2](https://github.com/lincenying/mmf-blog-react-v2)

vue2(spa): [https://github.com/lincenying/mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)

vue2(ssr): [https://github.com/lincenying/mmf-blog-vue2-ssr](https://github.com/lincenying/mmf-blog-vue2-ssr)

---

First installation `api server`:

koa2: https://github.com/lincenying/mmf-blog-api-koa2-v2

express: https://github.com/lincenying/mmf-blog-api-v2

```bash
# Install dependencies
yarn  #or  npm install
# Note: do not install with CNPM dependency

# Product
npm run build

# Develop
npm run dev
```

Home Site
http://localhost:8081

Login
http://localhost:8081/backend

# notice:
Because ` babelrc ` configuration

```javascript
"presets": [
    ["env", {
        "targets": {
            "chrome": 52
        }
    }]
]
```
So, in the development environment, please use chrome52 + open, if you need other low browser version, please modify the root directory of the `.Babelrc ` file

# LICENSE

MIT
