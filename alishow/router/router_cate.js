// 1、加载express模块并且创建router对象
const router = require('express').Router();
// 加载path模块
const path = require('path');
// 加载db模块
const db = require('../db.js');
const moment = require('moment');
// 打开后台index和login页面
router.get('/admin/index', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/index.html'), {});
});

router.get('/admin/other/nav-menus', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/other/nav-menus.html'), {});
})
router.get('/admin/other/settings', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/other/settings.html'), {});
})
router.get('/admin/other/slides', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/other/slides.html'), {});
})
// 显示后台列表栏目页面
router.get('/admin/cate/cate', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/cate/cate.html'), {});
})
// 获取栏目列表数据
router.get('/admin/cate/getCate', (req, res) => {
    // 编写sql语句
    const sql = 'select * from ali_cate';
    // 执行sql语句
    db.query(sql, (err, result) => {
        // 3、处理sql执行结束
        if (err) {
            console.log(err);
            return res.send({code: 201, message: '查询栏目失败'});
        }
        res.send({code: 200, message: '查询栏目成功', data: result});
    });
});
// 显示添加新栏目表单页面
router.get('/admin/cate/addcate', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/cate/addcate.html'), {});
})
// 添加栏目信息
router.get('/admin/cate/addCateDeal', (req, res) => {
    // 1、接收表单数据
    // 当前时间转化成我们想要的格式yyyy-mm-dd；
    const obj = {
        cate_name: req.query.name,
        cate_icon: req.query.icon,
        cate_addtime: moment().format('YYYY-MM-DD')
    }

    // 2、编写sql语句
    const sql = 'insert into ali_cate set ?';
    // 3、执行sql语句
    db.query(sql, obj, (err, result) => {
        // 4、处理sql执行结果
        if (err) {
            console.log(err);
            return res.send({code: 201, message: '添加新栏目失败'});
        }
        res.send({code: 200, message: '添加新栏目成功'});
    });
})
// 删除栏目信息
router.get('/admin/cate/delcate', (req, res) => {

    // 1、编写sql语句
    const sql = 'delete  from  ali_cate  where cate_id=?';
    // 2、接收id值
    const id = req.query.id;
    // 3、执行sql语句
    db.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            return res.send({code: 201, message: '删除栏目失败'});
        }
        res.send({code: 200, message: '删除栏目成功'});
    });
});

// 显示编辑栏目表单页面
router.get('/admin/cate/editcate', (req, res) => {
    // 接收cate_id
    const id = req.query.id;
    
    // 2、编写sql语句
    const sql = `select * from ali_cate where  cate_id=?`;
    // 3、执行sql语句
    db.query(sql, id, (err, result) => {
        console.log(id)
        // console.log(result)
        if (err || result.affectedRows == 0) {
            // console.log(err)
            return res.redirect('/admin/cate/cate');
        }
        res.render(path.join(global.rootPath, 'view', 'admin/cate/editcate.html'), result[0]);
    });
})

// 修改本id对应的信息
router.post('/admin/cate/modifycate', (req, res) => {
    // 1、获取id
    const id = req.body.id;
    // 2、获取表单数据并且重构
    const obj = {
        cate_name: req.body.name,
        cate_icon: req.body.icon,
        cate_addtime: req.body.time,
    };
    // 3、编写sql语句
    const sql = `update  ali_cate set ? where cate_id=?`;
    // 4、执行sql语句
    db.query(sql, [obj, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send({code: 201, message: '修改失败'})
        }
        res.send({code: 200, message: '修改成功', data: result});
    });
});

// 导出router对象
module.exports = router;