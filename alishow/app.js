const express = require('express');

const app = express();
const fs = require('fs');
const path = require('path');
const url = require('url');
app.listen(3000, () => {
    console.log('Express-Server Is Running');
})
// 托管静态资源
app.use('/assets', express.static('./view/assets'));
app.use('/uploads', express.static('./view/uploads'));
app.use('/upload', express.static('./upload'));

// 加载express-art-template模块并且配置
app.engine('html', require('express-art-template'));
// 加载body-parser模块
app.use(require('body-parser').urlencoded({
    extended: false
}));
// 加载express-session模块并且注册为中间件
const session = require('express-session');
// 该模块会在req对象上挂载一个session对象 ----》 req.session
app.use(session({
    secret: 'jsalkdjalkj',
    resave: false,
    saveUninitialized: false,
}));
// 将检测到session的中间件进行注册
app.use(checkSession);
// 将__dirname对应路径挂载到global对象下面的rootPath变量中
global.rootPath = __dirname;
//读取router目录下所有的目录文件，在循环加载模块并且注册为中间件
fs.readdir(path.join(__dirname, 'router'), (err, files) => {
    // 循环files中保存的路由文件名
    for (let i = 0; i < files.length; i++) {
        // 每取出一个路由文件都加载并且注册为中间件
        let router = require('./router/' + files[i]);
        app.use(router);
    }
})
// 加载api模块
app.use(require('./api.js'));
// 声明检测的中间件函数
//两个路由不需要检测，/admin/login 和 /admin/checkLogin
function checkSession(req, res, next) {
    // 1、首先要把这两个路由存放到数组
    const urlArr = ['/admin/login', '/admin/checkLogin', '/index', '/list', '/detail'];
    const urlObj = url.parse(req.url, true);
    // 如果当前访问的路由在数组中存在,则直接执行下一个
    if (urlArr.includes(urlObj.pathname)) {
        return next();
    }
    if (req.session.isLogin !== true) {
        //跳转回登录页
        return res.redirect('/admin/login')
    }
    next();
}