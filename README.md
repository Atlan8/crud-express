# Express - crud

## 起步

- 初始化
- 模版处理
## 路由设计

| 请求方法 |     请求路径     | get 参数 |           post 参数            |       备注       |
| :------: | :--------------: | :------: | :----------------------------: | :--------------: |
|   GET    |    /students     |          |                                |     渲染首页     |
|   GET    |  /students/new   |          |                                | 加载添加学生页面 |
|   POST   |  /students/new   |          |   name、age、gender、hobbies   | 处理添加学生请求 |
|   GET    |  /students/edit  |    id    |                                |   渲染编辑页面   |
|   POST   |  /students/edit  |          | id、name、age、gender、hobbies |   处理编辑请求   |
|   GET    | /students/delete |    id    |                                |   处理删除请求   |
|          |                  |          |                                |                  |
|          |                  |          |                                |                  |
|          |                  |          |                                |                  |


```
{
  "students": [
    {"id": 1,"name": "张三","gender": 0,"age": 15,"hobbies": "吃饭、睡觉、看电影..."},
    {"id": 2,"name": "张三","gender": 0,"age": 15,"hobbies": "吃饭、睡觉、看电影..."},
    {"id": 3,"name": "张三","gender": 0,"age": 15,"hobbies": "吃饭、睡觉、看电影..."},
    {"id": 4,"name": "张三","gender": 0,"age": 15,"hobbies": "吃饭、睡觉、看电影..."},
    {"id": 5,"name": "张三","gender": 0,"age": 15,"hobbies": "吃饭、睡觉、看电影..."},
    {"id": 6,"name": "张三","gender": 0,"age": 15,"hobbies": "吃饭、睡觉、看电影..."},
    {"id": 7,"name": "张三","gender": 0,"age": 15,"hobbies": "吃饭、睡觉、看电影..."},
    {"id": 8,"name": "张三","gender": 0,"age": 15,"hobbies": "吃饭、睡觉、看电影..."},
    {"id": 9,"name": "张三","gender": 0,"age": 15,"hobbies": "吃饭、睡觉、看电影..."}
  ]
}
```





#CRUD
