// 1、加载express模块并且创建router对象
const router = require('express').Router();
// 加载path模块
const path = require('path');
// 加载db模块
const db = require('../db.js');

// 显示个人中心页面
router.get('/admin/center/profile', (req, res) => {
    // 调用模板引擎把当前session中当前用户登陆的数据渲染到页面上
    res.render(path.join(global.rootPath, 'view', 'admin/center/profile.html'), req.session.userInfo);
})
// 显示修改密码页面
router.get('/admin/center/password-reset', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'admin/center/password-reset.html'), {});
})

// 导出router对象
module.exports = router;