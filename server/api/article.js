var mongoose = require('mongoose')
var Article = mongoose.model('Article')
const isLogin = require('./islogin')
var moment = require('moment')

/**
 * 管理时, 获取文章列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getAdminArticle = (req, res) => {
    var limit = req.body.limit,
        page = req.body.page
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    var skip = (page - 1) * limit
    Promise.all([
        Article.find().sort('-_id').skip(skip).limit(limit).exec(),
        Article.countAsync()
    ]).then(result => {
        var total = result[1]
        var totalPage = Math.ceil(total / limit)
        var json = {
            code: 200,
            data: {
                list: result[0],
                total,
                hasNext: totalPage > page ? 1 : 0,
                hasPrev: page > 1 ? 1 : 0
            }
        }
        res.json(json)
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 管理时, 获取单篇文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getArticle = (req, res) => {
    if (!req.query.id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    Article.findOneAsync({
        _id: req.query.id
    })
    .then(result => {
        res.json({
            code: 200,
            data: result
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 前台浏览时, 获取文章列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getArticleList = (req, res) => {
    var id = req.body.id,
        limit = req.body.limit,
        page = req.body.page,
        qs = req.body.qs
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    var data = {
            is_delete: 0
        },
        skip = (page - 1) * limit
    if (id) {
        data.category = id
    }
    if (qs) {
        var reg = new RegExp(qs, 'i')
        data.title = {$regex : reg}
    }

    Promise.all([
        Article.find(data).sort('-_id').skip(skip).limit(limit).exec(),
        Article.countAsync(data)
    ]).then(result => {
        var total = result[1]
        var totalPage = Math.ceil(total / limit)
        var json = {
            code: 200,
            data: {
                list: result[0],
                total,
                hasNext: totalPage > page ? 1 : 0
            }
        }
        res.json(json)
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 前台浏览时, 获取单篇文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

exports.article = (req, res) => {
    var _id = req.query.id || req.body.id
    if (!_id) {
        res.json({
            code: -200,
            message: '参数错误'
        })
    }
    Promise.all([
        Article.findOneAsync({
            _id,
            is_delete: 0
        }),
        Article.findOne({
            is_delete: 0
        }).where('_id').gt(_id).sort('_id').exec(),
        Article.findOne({
            is_delete: 0
        }).where('_id').lt(_id).sort('-_id').exec()
    ]).then(value => {
        var next = {
            next_id: value[1] ? value[1]._id : '',
            next_title: value[1] ? value[1].title : ''
        }

        var prev = {
            prev_id: value[2] ? value[2]._id : '',
            prev_title: value[2] ? value[2].title : ''
        }

        var json = {
            code: 200,
            data: value[0],
            prev,
            next
        }
        res.json(json)
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 发布文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.post = (req, res) => {
    isLogin(req, res)
    var category = req.body.category,
        content = req.body.content,
        title = req.body.title
    var data = {
        title,
        category,
        content,
        visit: 0,
        comment_count: 0,
        creat_date: moment().format('YYYY-MM-DD HH:MM:SS'),
        is_delete: 0,
        timestamp: moment().format('X')
    }
    Article.createAsync(data)
    .then(result => {
        return res.json({
            code: 200,
            user_id: result._id,
            message: '发布成功'
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 管理时, 删除文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.delete = (req, res) => {
    isLogin(req, res)
    var id = req.body.id
    Article.updateAsync({
        _id: id
    }, {
        is_delete: 1
    }).then(() => {
        res.json({
            code: 200,
            message: '更新成功'
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 管理时, 恢复文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.recover = (req, res) => {
    isLogin(req, res)
    var id = req.body.id
    Article.updateAsync({
        _id: id
    }, {
        is_delete: 0
    }).then(() => {
        res.json({
            code: 200,
            message: '更新成功'
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

/**
 * 管理时, 编辑文章
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.modify = (req, res) => {
    isLogin(req, res)
    var category = req.body.category,
        content = req.body.content,
        id = req.body.id,
        title = req.body.title
    Article.updateAsync({
        _id: id
    }, {
        title,
        content,
        category
    }).then(() => {
        res.json({
            code: 200,
            message: '更新成功'
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
