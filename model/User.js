const mongoose = require('mongoose');
//创建用户集合规则
const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	nickName: {
		type: String,
	},
	password: {
		type: String,
		required: true
	},
	//头像
	avatar: {
		type: String,
		default: null
	},
	gender: {
		type: Number,
		default: 0,
	},
	authority: {
		type: String,
		default: 'admin'
	},
	//创建时间
	createTime: {
		type: Date,
		default: Date.now
	}
}, { versionKey: false });

//用户集合类
const User = mongoose.model('User', userSchema);

//导出对象
module.exports = {
	User,
}