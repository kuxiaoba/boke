// 封装路由模块的目的 是为了保证每个模块的职能单一
// 对于路由模块来说 只需要管分配 url 地址到 处理函数之间的对应关系即可
// 路由模块 并不关心如何处理这次请求
const express = require('express')
    // 创建路由
const router = express.Router()

// 导入自己的业务处理模块
const str = require('../controller/index.js')


router.get('/', str.showIndexPage)

//暴露路由
module.exports = router;