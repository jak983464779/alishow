// 1.加载fs模块
const fs = require('fs');
/*
    调用readdir方法读取目录下所有的文件夹的名称
    参书1：要读取的目录路径 ---- 相对或者绝对路径
    参数2：可选参数，读取使用的字符集
    参数3：读取完后触发的回调函数，有两个参数
        参数1：错误对象
        参数2：所有文件，文件夹的名称，数组形式
*/ 
fs.readdir('./router', (err, files) => {
    console.log(err);
    console.log(files);
})