var mongoose = require('mongoose')
var User = mongoose.model('User')
var md5 = require('md5')

exports.insertUser = (req, res, next) => {
    User.createAsync({
        username: 'admin',
        password: md5('123456'),
        leval: 9
    })
    .then(() => {
        res.send('添加用户成功: admin, 密码: 123456')
    }).catch(err => next(err))
}

exports.login = (req, res) => {
    var json = {},
        password = req.body.password,
        username = req.body.username
    if (username === '' || password === '') {
        json = {
            code: -200,
            message: '请输入用户名和密码'
        }
        res.json(json)
    }
    User.findOneAsync({
        username,
        password: md5(password)
    })
    .then(result => {
        if (result) {
            var id = result._id
            var remember_me = req.body.remember_me ? 2592000000 : 86400000
            var token = md5(id + "|" + username)
            res.cookie('user', token, { maxAge: remember_me })
            res.cookie('userid', id, { maxAge: remember_me })
            res.cookie('username', username, { maxAge: remember_me })
            json = {
                code: 200,
                message: '登录成功',
                data: token
            }
        } else {
            json = {
                code: -200,
                message: '用户名,密码错误'
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
