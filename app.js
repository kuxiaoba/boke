const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const pash = require('path')
const fs = require('fs')

// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
    // 设置模板页面的存放路径
app.set('views', './views')

// 注册解析表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }))

// 把node_modules文件夹挂载为静态托管资源 第一个参数为虚拟路径
app.use('/node_modules', express.static('node_modules'))

// 导入router/index.js路由模块
// const router1 = require('./router/index.js')
// app.use(router1);
// const router2 = require('./router/user.js')
// app.use(router2)

// 使用循坏 进行路由的自动注册
fs.readdir(pash.join(__dirname, './router'), (err, res) => {
    if (err) return console.log('读取 router目录中的路由失败');
    // 循坏router目录下的每一个文件名
    res.forEach(fname => {
        // 没循坏一次，拼接处一个完整的路由模块地址
        // 如何使用require 导入这个路由模块
        // console.log(pash.join(__dirname, './router', fname));
        const router = require(pash.join(__dirname, './router', fname))
        app.use(router);
    })
})

app.listen(3000, () => {
    console.log("sever running at http://127.0.0.1:3000")
})