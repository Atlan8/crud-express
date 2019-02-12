/**
 *  router.js 路由模块
 *  职责：
 *      处理路由
 *      根据不同的 请求方法 + 请求路径 设置具体的请求处理函数
 */
let fs = require('fs');
let Student = require('./students');

// Express 提供了一种更好的方式，专门用来包装路由的
let express = require('express');
// 1. 创建一个路由容器
let router = express.Router();

// 2. 把路由都挂载到 router 路由容器中
router.get('/students', function (req, res) {
    // res.send('Hello world!');
    /*fs.readFile('./db.json', function (err, data) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('index.html', {
            // 从文件中读取到的是字符串，要手动转成对象
            students: JSON.parse(data).students
        });
    });*/
    // ！！！先写调用格式，再去封装函数
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error.');
        }
        res.render('index.html', {
            // 从文件中读取到的是字符串，要手动转成对象
            students: students
        });
    })
});
router.get('/students/new', function (req, res) {
    res.render('new.html');
});
/**
 *  处理添加学生
 */
router.post('/students/new', function (req, res) {
    /**
     *  获取表单数据
     *  处理
     *      将获取到的数据保存到 db.json 文件中用以持久化
     *          先读取出来，转成对象
     *          再往对象中 push 数据
     *          然后把对象转成字符串
     *          然后把字符串再次写入文件
     *  发送响应
     */
    new Student(req.body).save(function (err) {
        if (err) {
            return res.status(500).send('Server error.');
        }
        res.redirect('/students');
    })
});
/**
 * 渲染编辑学生页面
 */
router.get('/students/edit', function (req, res) {
    /**
     *  1. 在客户端的列表页中处理链接问题（需要有 id 参数）
     *  2. 获取要编辑的学生 id
     *
     *  3. 渲染编辑页面
     *      根据 id 把学生信息查出来
     *      使用模版引擎渲染页面
     */
    Student.findById(req.query.id, function (err, student) {
        if (err) {
            return res.status(500).send('Server error.');
        }
        res.render('edit.html', {
            students: student
        });
    });
});
/**
 *  处理编辑学生
 */
router.post('/students/edit', function (req, res) {
    Student.findByIdAndUpdate(req.body.id, req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.');
        }
        res.redirect('/students');
    })

});

/**
 * 删除学生
 */
router.get('/students/delete', function (req, res) {
    /**
     *  获取要删除学生的 id
     *  根据 id 执行删除操作
     *  根据操作结果发送响应数据
     */
    // console.log(req.query.id);
    Student.findByIdAndRemove(req.query.id, function (err) {
        if (err) {
            return res.status(500).send('Server error.');
        }
        res.redirect('/students');
    })
});

// 3. 把 router 导出
module.exports = router;
