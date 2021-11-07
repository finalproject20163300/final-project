require('dotenv').config();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const conn = require("../module/connection");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 11;

function getCurrentDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var today = date.getDate();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var milliseconds = date.getMilliseconds();
	return new Date(
		Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
	);
}

const userSchema = new Schema({
	name: {
		type: String,
		maxlength: 50,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		minlength: 4,
	},
	role: { // 1. 어드민 2. 의사 3. 유저 의사는 어드민의 승인이 있어야 로그인 가능?
		type: Number,
	},
	image: {
		type: String,
	},
	token: {
		type: String,
	},
	tokenExp: {
		type: Number,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

// a setter
// userSchema.path("name").set(function (v) {
// 	return capitalize(v); // 대문자로 바꿔주기
// });

// // middleware
// userSchema.pre('save', function (next) {
//   notify(this.get('email'));
//   next();
// });

// middleware
userSchema.pre("save", function (next) { // 저장하기 전
	var user = this;
	if (user.isModified("password")) { // 패스워드 암호화
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) return next(err);
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

// methods
userSchema.methods.comparePassword = function (password, cb) {
	bcrypt.compare(password, this.password, function (err, result) {
		let msg = null;
		if (err) {msg = "error";} // err = err;
		if (!result) msg = "비밀번호가 일치하지 않습니다.";
		cb(msg, result);
	});
};

userSchema.methods.generateToken = function (cb) {
	var user = this;
	var token = jwt.sign(user._id.toHexString(), ""); // secret+Token+ID
	var oneHour = moment().add(1, "hour").valueOf();
	user.token = token;
	user.tokenExp = oneHour;
	user.save(function (err, user) {
		if (err) return cb(err);
		return cb(null, user);
	});
};

userSchema.statics.findByToken = function (token, cb) {
	let user = this;
	jwt.verify(token, process.env.jwtSecretCode, function (err, decoded) {
		user.findOne({ "_id": decoded, "token": token }, function (err, user) {
			if (err) cb(err);
			cb(null, user);
		});
	});
};

// token

// const instance = new UserModel();
// instance.email = 'LOG';
// instance.save(function(err){

// });

const User = mongoose.model("User", userSchema);
// export model
module.exports = { User, userSchema };
