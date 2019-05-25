// 1、加载express模块并且创建router对象
const router = require('express').Router();
// 加载path模块
const path = require('path');
// 加载db模块
const db = require('../db.js');

// 显示文章管理页面
router.get('/admin/post/addpost', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/post/addpost.html'), {})
});

router.get('/admin/post/posts', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/post/posts.html'), {});
})
router.get('/admin/post/editpost', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/post/editpost.html'), {});
})
// 单行删除文章
router.post('/admin/posts/delPage', (req, res) => {
    // 1、获取id
    const id = req.body.id;
    // 2、编写sql语句
    const sql = 'delete from ali_article where article_id=?';
    // 3、执行sql语句
    db.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            return res.send({
                code: 201,
                message: '删除失败'
            })
        }
        return res.send({
            code: 200,
            message: '删除成功'
        })
    })
})
module.exports = router;