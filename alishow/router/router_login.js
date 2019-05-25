// 1、加载express模块并且创建router对象
const router = require('express').Router();
// 加载path模块
const path = require('path');
// 加载db模块
const db = require('../db.js');

// 显示后台登陆界面
router.get('/admin/login', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/login.html'), {});
});
// 检测用户登陆信息
router.post('/admin/checkLogin', (req, res) => {
    // 1.接收数据，用户名和密码
    const email = req.body.email;
    const pwd = req.body.pwd;
    // 2、编写sql语句
    const sql = 'select * from ali_admin where admin_email=? and admin_pwd=?';
    // 3、执行sql语句
    db.query(sql, [email, pwd], (err, result) => {
        // 4.处理sql执行结果
        if (err) {
            console.log(err);
            return res.send({code: 201, message: '登陆失败'});
        }
        // 当查询结果为1条数据时，说明用户和密码正确，登陆成功
        if (result.length == 1) {
            //登陆成功 --- 将登陆状态记录到session中
            // 注册登陆状态
            req.session.isLogin = true;
            // 将当前登陆的用户信息保存到req.session.userInfo中
            req.session.userInfo = result[0];

            res.send({code: 200, message: '登陆成功'});
        } else {
            res.send({code: 201, message: '用户名或者密码错误'})
        }
    })
});

// 退出登陆，清除session
router.post('/admin/logout', (req, res) => {
    req.session.destroy();
    res.send({code: 200, message: '退出系统成功'});
})
module.exports = router;