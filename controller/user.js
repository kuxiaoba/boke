const moment = require('moment')
const mysql = require('mysql')

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'mysql-01'
})

const show = (req, res) => {
    // 注意 当在调用模板引擎的res.render函数的时候, ./ 相对路径，是相对于app.set('views')指定的目录
    // 来进行查找的
    res.render('./user/register', {})
}
const showw = (req, res) => {
    // 注意 当在调用模板引擎的res.render函数的时候, ./ 相对路径，是相对于app.set('views')指定的目录
    // 来进行查找的
    res.render('./user/login', {})
}
const showww = (req, res) => {
    // 完成用户注册的业务逻辑
    // req.body拿到请求来的数据
    const body = req.body;
    console.log(body);
    // 判断用户输入的数据是否完整
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.send({ msg: '请填写完整的数据', status: 501 })
    }

    // 查询用户名是否重复
    const sql1 = 'select count(*) as count from blog_users where username=?'
    conn.query(sql1, body.username, (err, result) => {
        // 如果查询失败 则告知客户端查询失败
        if (err) return res.send({ msg: '用户名查重失败', status: 502 })

        if (result[0].count !== 0) return res.send({ msg: '请更换其他用户名后重新注册', status: 502 })
            // 执行注册的业务逻辑
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        const sql2 = 'insert into blog_users set ?'
        console.log(body);

        conn.query(sql2, body, (err, result) => {
            if (err) return res.send({ msg: '插入新用户失败', status: 504 })
            console.log(result);
            if (result.affectedRows !== 1) res.send({ msg: '插入新用户失败', status: 505 })
            res.send({ msg: '注册新用户成功', status: 200 })
        })
    })
}
const showwww = (req, res) => {
    // 1 获取到表单中的数据
    const body = req.body
    console.log(body);
    // 2 执行sql语句查询用户名是否存在
    const sql = 'select * from blog_users where username = ? and password=?'
    conn.query(sql, [body.username, body.password], (err, result) => {
        // 如果查询期间 执行sql语句失败 则认为登录失败
        if (err) return res.send({ msg: '用户登录失败', status: 501 })
            // 如果查询结果记录条数不为1 ，则证明查询失败
        if (result.length !== 1) return res.send({ msg: '用户登录失败', status: 502 })
            // 查询成功
        res.send({ msg: 'ok', status: 200 })
    })
}
module.exports = {
    show,
    showw,
    showww,
    showwww
}