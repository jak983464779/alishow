const express = require('express');
//创建路由对象
const router = express.Router();

const path = require('path');
const db = require('../db.js');

//显示前台首页
router.get('/index', (req, res) => {
    const sql = `select * from ali_cate;
                select * from ali_article order by rand() limit 0,5;
                select * from ali_pic;
                select * from ali_article  where article_focus=1 order by article_addtime desc limit 0,5;
                select * from ali_article join ali_admin on article_adminid=admin_id join ali_cate on article_cateid=cate_id limit 0,3`;




    db.query(sql, (err, result) => {
        // 重构查询结果数据
        const obj = {
            cate: result[0],
            rand: result[1],
            pic: result[2],
            focus: result[3],
            news: result[4]
        };
        res.render(path.join(rootPath, 'view', 'index.html'), obj);
    })
})

router.get('/list', (req, res) => {
    //接收栏目id
    const id = req.query.id || 1;
    const sql = `select * from ali_cate;
                select * from ali_article order by rand() limit 0,5;
                select * from ali_cate where cate_id=${id};
                select * from ali_article join ali_admin on article_adminid=admin_id
                where article_cateid=${id};
                `;
    // 执行sql语句
    db.query(sql, (err, result) => {
        // 重构sql语句
        const obj = {
            cate: result[0],
            rand: result[1],
            name: result[2][0],
            list: result[3]
        };
        res.render(path.join(rootPath, 'view', 'list.html'), obj);
    })

})
router.get('/detail', (req, res) => {
    // 接收article_id
    const id = req.query.id;
    // 编写sql
    const sql = `select * from ali_cate;
                    select * from ali_article order by rand() limit 0,5;
                    select ali_article.*,ali_admin.admin_nickname,
                    ali_cate.cate_id,ali_cate.cate_name from ali_article
                    join ali_admin on ali_article.article_adminid=ali_admin.admin_id
                    join ali_cate on ali_article.article_cateid=ali_cate.cate_id
                    where ali_article.article_id=${id}`;
    db.query(sql, (err, result) => {
        const obj = {
            cate: result[0],
            rand: result[1],
            article: result[2][0],
            
        };
        res.render(path.join(global.rootPath, 'view', 'detail.html'), obj);
    })

})

module.exports = router;