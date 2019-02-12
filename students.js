let mongoose = require('mongoose')

let Schema = mongoose.Schema

// 连接数据库
mongoose.connect('mongodb://localhost/itcast')

let studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender:{
        type: Number,
        enum: [0,1], // 枚举约束，只能是 0 1，不能是别的
        default: 0
    },
    age:{
        type: Number
    },
    hobbies:{
        type: String
    }
})

// 直接导出模型构造函数
module.exports = mongoose.model('Student', studentSchema)