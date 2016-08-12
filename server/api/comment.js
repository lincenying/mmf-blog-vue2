var mongoose = require('mongoose')
var Comment = mongoose.model('Comment')
var moment = require('moment')
/**
 * 发布评论
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.postComment = (req, res) => {
    var content = req.body.content,
        creat_date = moment().format('YYYY-MM-DD HH:MM:SS'),
        id = req.body.id,
        timestamp = moment().format('X'),
        username = req.body.username || '匿名'
    if (!content) {
        res.json({
            code: -200,
            message: '请输入评论内容'
        })
    }
    var data = {
        article_id: id,
        username,
        email: '',
        content,
        reply_id: 0,
        reply_user: '',
        creat_date,
        is_delete: 0,
        timestamp
    }
    Comment.createAsync(data)
    .then(result => {
        return res.json({
            code: 200,
            data: {
                _id: result._id,
                article_id: id,
                username,
                content,
                creat_date,
                is_delete: 0
            },
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
 * 前台浏览时, 读取评论列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.comment = (req, res) => {
    var id = req.query.id || req.body.id,
        limit = req.body.limit,
        page = req.body.page
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    var data = {
            is_delete: 0,
            article_id: id
        },
        skip = (page - 1) * limit
    Promise.all([
        Comment.find(data).sort('-_id').skip(skip).limit(limit).exec(),
        Comment.countAsync(data)
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
