// 1、加载express模块并且创建router对象
const router = require('express').Router();
// 加载path模块
const path = require('path');
// 加载db模块
const db = require('../db.js');
const moment = require('moment');
// 显示管理员界面
router.get('/admin/user/users', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/user/users.html'), {});
})
// 显示管理员数据信息
router.get('/admin/user/getUser', (req, res) => {
    // 1、编写sql语句
    const sql = 'select * from ali_admin';
    // 2、执行sql语句
    db.query(sql, (err, result) => {
        // 3、处理sql执行结果
        if (err) {
            console.log(err);
            return res.send({
                code: 201,
                message: '查询数据失败'
            });
        }
        res.send({
            code: 200,
            message: '查询数据成功',
            data: result
        });
    });
})
//显示添加管理员页面
router.get('/admin/user/adduser', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/user/adduser.html'), {});
});

// 添加管理员路由
router.get('/admin/user/adduserdeal', (req, res) => {
    // 1、接收表单提交的数据
    const obj = {
        admin_pic: '/upload/7.jpg',
        admin_email: req.query.email,
        admin_nickname: req.query.nickname,
        admin_tel: req.query.tel,
        admin_age: req.query.age,
        admin_sign: req.query.sign,
        admin_pwd: req.query.password,
        admin_addtime: moment().format('YYYY-MM-DD'),
        admin_state: '激活'

    };
    // 2.编写sql语句
    const sql = 'insert into ali_admin set ?';
    // 3.执行sql语句
    db.query(sql, obj, (err, result) => {
        // 4.处理sql执行结果
        if (err) {
            console.log(err);
            return res.send({
                code: 201,
                message: '添加管理员失败'
            });
        }
        res.send({
            code: 200,
            message: '添加管理员成功',
            data: result
        });
    });
});

// 删除管理员路由
router.get('/admin/user/deluser', (req, res) => {
    // 1.获取id值
    const id = req.query.id;
    // 2.编写sql语句
    const sql = 'delete from ali_admin where admin_id=?';
    // 3.执行sql语句
    db.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            return res.send({
                code: 201,
                message: '删除数据失败'
            });
        }
        res.send({
            code: 200,
            message: '删除数据成功',
            data: result
        });
    });
});

//批量删除管理员
router.get('/admin/user/delusers', (req, res) => {
    // 1.接收数据
    const ids = req.query.ids;
    // 2.编写sql语句
    const sql = `delete from ali_admin where admin_id in (${ids})`;
    // 3.执行sql语句
    db.query(sql, ids, (err, result) => {
        // 3、处理sql执行结束
        if (err) {
            console.log(err);
            return res.send({code: 201, message: '批量删除数据失败'})
        }
        return res.send({code: 200, message: '批量删除数据成功'})
    });
})
//编辑管理员路由
router.get('/admin/user/edituser', (req, res) => {
    // 1、获取id值
    const id = req.query.id;
    // 2、编写sql语句
    const sql = `select * from ali_admin where admin_id=?`;
    // 3、执行sql语句
    db.query(sql, id, (err, result) => {
        // 4、处理sql语句
        if (err) {
            console.log(err)
            res.render(path.join(global.rootPath, 'view', 'admin/user/edituser.html'), []);
        }
        res.render(path.join(global.rootPath, 'view', 'admin/user/edituser.html'), result[0]);
    })

});
// 修改管理员信息路由
router.get('/admin/user/modifyuser', (req, res) => {
    // 1、获取表单数据
    const obj = {
        admin_email: req.query.email,
        admin_nickname: req.query.nickname,
        admin_tel: req.query.tel,
        admin_age: req.query.age,
        admin_gender: req.query.gender,
        admin_sign: req.query.sign,
        admin_state: req.query.state
    };
    // 2.获取id
    const id = req.query.id;
    // 3.编写sql
    const sql = 'update ali_admin set ? where admin_id=?';
    // 4.执行sql语句
    db.query(sql, [obj, id], (err, result) => {
        // console.log(id)
        if (err) {
            console.log(err);
            return res.send({
                code: 201,
                message: '修改数据失败'
            });
        }
        return res.send({
            code: 200,
            message: '修改数据成功',
            data: result
        });
    })
})


module.exports = router;