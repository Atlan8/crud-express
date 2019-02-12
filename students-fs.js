/**
 *  students-fs.js
 *  数据文件操作模块
 *  职责：操作文件中的数据，只处理数据，不关心业务
 *
 *  这里是 Node 的精华部分
 *      封装异步 API
 */
let fs = require('fs');
let dbPath = './db.json';

/**
 * 获取所有学生列表
 * callback 中的参数
 *     第一个参数要么是err，要么是null
 *         成功是 null，失败是 err
 *     第二个参数才是我们想要的数组
 *         成功是 数组，失败是 undefined
 *     否则，callback 返回的始终是一个对象，我们无法辨识
 * return []
 */
// 回调函数：用来获取异步操作的结果，只能使用回调函数
exports.find = function (callback) {
    fs.readFile(dbPath, function (err, data) {
        // 这里需要返回 JSON.parse(data).students
        // 要怎么做呢
        //     设计一个回调函数来处理异步操作
        if (err) {
            return callback(err);
        }
        /**
         *  第一个参数要么是err，要么是null
         *  第二个参数才是我们想要的
         *  否则，callback 返回的始终是一个对象，我们无法辨识
         */
        callback(null, JSON.parse(data).students);
    });
};
// 真正调用的时候
/*exports.find(function (err, students) {
    // 不需要考虑数据，只处理业务逻辑
    // 失败了就发送错误信息
    // 成功了就返回渲染的页面
    if (err) {
        return res.status(500).send('Server error.')
    }
    res.render('index.html', {
        // 从文件中读取到的是字符串，要手动转成对象
        students: students
    });
})*/

/**
 *  根据 id 获取学生信息对象
 * @param  {Number} id  学生 id
 * @param {Function} callback  回调函数
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err);
        }
        let students = JSON.parse(data).students;

        let ret = students.find(function (item) {
            return item.id === parseInt(id);
        });
        callback(null, ret);
    });
};

/**
 * 添加保存学生
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err);
        }
        let students = JSON.parse(data).students;

        // 处理 id 唯一的，不重复
        student.id = students[students.length - 1].id + 1;

        students.push(student);
        // 因为 students 对象的外层还是一个对象，所以需要以对象的形式传入参数
        let fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 有错误，传递错误对象
                callback(err);
            }
            // 成功就没有错误，传递 null
            callback(null);
        });
    });
};
// 真正调用
/*exports.save({
    name: 'xxx',
    age: 18,
    ...
}, function (err) {
    if (err) {
        // 根据传递的错误对象处理业务逻辑
        console.log('保存失败了')
    } else {
        console.log('保存成功了')
    }
})*/

/**
 * 更新学生
 */
exports.update = function (student, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err);
        }
        let students = JSON.parse(data).students;

        /**
         *  要修改谁，就需要把谁找出来
         *  es6 一个数组方法：find
         *  需要接收一个函数作为参数
         *  当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
         */
        let stu = students.find(function (item) {
            return item.id === parseInt(student.id);
        });
        for (let key in student) {
            stu[key] = student[key];
        }
        // 注意这里要把body中的数字改为number，原来是字符串
        stu.id = parseInt(student.id);
        stu.gender = parseInt(student.gender);
        stu.age = parseInt(student.age);

        // 因为 students 对象的外层还是一个对象，所以需要以对象的形式传入参数
        let fileData = JSON.stringify({
            students: students
        });

        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 有错误，传递错误对象
                callback(err);
            }
            // 成功就没有错误，传递 null
            callback(null);
        });
    });
};
// 真正调用
/*exports.updata({
    id: 1,
    name: 'xxx',
    age: 12,
    ...
}, function (err) {
    if (err) {
        console.log('保存失败了')
    } else {
        console.log('保存成功了')
    }
});*/


/**
 * 删除学生
 */
exports.delete = function (id, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            return callback(err);
        }
        let students = JSON.parse(data).students;

        // findIndex 方法是 es6 用来查找数组下标的
        let deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id);
        });

        // 用 splice(index, num) 方法来删除元素
        students.splice(deleteId, 1);

        let fileData = JSON.stringify({
            students: students
        });
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        })
    })
};
/*exports.delete(id, function (err) {
    if (err) {
        console.log('删除失败')
    } else {
        console.log('删除成功')
    }
})*/
