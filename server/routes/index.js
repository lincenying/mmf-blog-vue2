var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

var article = require('../api/article'),
    comment = require('../api/comment'),
    user = require('../api/user')

// 首页
router.get('/', (req, res) => {
    res.render('index.html', { title: '首页' })
})

// 登录页
router.get('/login', (req, res) => {
    res.render('login.html', { title: '登录' })
})

// 添加管理员
router.get('/admin', (req, res) => {
    user.insertUser(req, res)
})

router.get('*', (req, res) => {
    res.render('index.html', { title: '首页' })
})

// API
router.post('/api', multipartMiddleware, (req, res, next) => {
    var action = req.query.action || req.body.action
    var articleArray = ['getAdminArticle', 'getArticle', 'getArticleList', 'article', 'post', 'delete', 'recover', 'modify', ],
        commentArrat = ['postComment', 'comment'],
        userArray = ['login']
    if (userArray.indexOf(action) > -1) {
        user[action](req, res, next)
    } else if (articleArray.indexOf(action) > -1) {
        article[action](req, res, next)
    } else if (commentArrat.indexOf(action) > -1) {
        comment[action](req, res, next)
    } else {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
})

module.exports = router
