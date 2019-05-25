// 1、加载mysql模块并且创建mysql链接
const conn = require('mysql').createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'alishow',
    multipleStatements: true
})
// 2、链接mysql服务器
conn.connect();

module.exports = conn;