/**
 *  一个模块最好是单一职责，否则容易引起混乱
 *  我们分模块的目的就是为了增强项目的可维护性，提升开发效率
 *
 *  app.js 入口模块
 *  职责：
 *      创建服务
 *      做一些服务相关配置
 *           模版引擎
 *           body-parser 解析表单 post 请求体
 *           提供静态资源服务
 *       挂载路由
 *       监听端口，启动服务
 * @type {createApplication}
 */
let express = require('express');
let bodyParser = require('body-parser');

let router = require('./router');
let app = express();

app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));
app.engine('html', require('express-art-template'));

// 配置模版引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// 把路由容器挂载到 app 服务器
app.use(router);

app.listen(3000, function () {
    console.log('running at port 3000...');
});