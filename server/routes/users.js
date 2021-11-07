// express + router
const express = require("express");
const router = express.Router();

// model
const { User } = require("../../server/models/User");
// middleware
const { auth } = require("../middleware/auth");

// auth 미들웨어, 라우터, 비동기, cb, (err, result)
router.get("/auth", auth, (req, res) => {
	// 성공 시에만
	res.status(200).json({
		success: true,
		_id: req.user._id,
		email: req.user.email,
		isAuth: true,
		isAdmin: req.user.role === 0 ? false : true,
	});
});

// register 가입
router.post("/register", (req, res) => {
	const user = new User(req.body);
	user.save((err, doc) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
			doc: doc,
		});
	});
});

router.post("/login", (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email: email }, (err, user) => {
		if (!user)
			return res.json({
				success: false, // loginSuccess -> success
				msg: "계정이 존재하지 않습니다.",
			});
		// user <- this
		user.comparePassword(password, (err, isMatch) => {
			if (!isMatch)
				return res.json({
					success: false,
					msg: err,
				});
			user.generateToken((err, user_ge) => {
				if (err) return res.status(400).send(err);
				res.cookie("w_authExp", user_ge.tokenExp);
				res.cookie('w_auth', user_ge.token, {maxAge : 900000}).status(200).json({
					success: true,
					status: '성공여부-성공',
					userId: user_ge._id,
					user: user_ge // 이건 없앨거임
				});
			});
		});
	});
});

// 찾기
router.post("/find", (req, res) => {
	const user = new User(req.body);
});



// 로그아웃 Logout
router.get("/logout", auth, (req, res) => {
	User.findOneAndUpdate(
		{ _id: req.user._id },
		{ token: "", tokenExp: "" },
		(err, doc) => {
			if (err)
				return res.json({
					status: "error",
					msg: err,
				});
			return res.status(200).send({
				status: "Success",
				msg: "DB 업데이트 성공 / 로그아웃 성공",
				doc: doc,
			});
		});
});

// 회원 탈퇴
router.get("/delete", (req, res) => {
	// 토큰 확인만 하고 바로 보내줌 확인과정은 사이트에서
	return res.json({
		status: "Success",
		msg: "메시지",
		action: "회원 탈퇴",
	});
});

// 테스트
router.post("/test", (req, res) => {
	return res.json({
		msg: req.body.req,
	});
});

router.get("/test1", (req, res) => {
	res.send("test node");
});

// 쿠키 테스트
router.get("/cookie", (req, res) => {
	res.cookie("test", "test");
	res.send("test");
});

router.post("/info", auth, (req, res) => {
	return res.status(200).json({
		success: true,
		user: {
			_id: req.user._id,
			email: req.user.email,
			isAuth: true,
			isAdmin: req.user.role === 0 ? false : true,
		},
		user_ge: req.user,
		msg: "정보 수신",
	});
});

module.exports = router;
