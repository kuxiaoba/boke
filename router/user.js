const express = require('express')
    // 创建路由
const router = express.Router()

// 导入用户处理函数
const strr = require('../controller/user.js')

router.get('/register', strr.show)

router.get('/login', strr.showw)

// 注册新用户
router.post('/register', strr.showww)

// 监听登录的请求
router.post('/login', strr.showwww)

module.exports = router