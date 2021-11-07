// 인증 시스템은 진짜 혼자서 만들어봐야지
// 기본적으로 뭐가 필요하지? 그냥 비교하는건가?
// 비교해서 리턴으로 값 뽑아내는건가?
const { User } = require("../models/User");

// 쿠키에서 정보 뽑아오기
let auth = (req, res, next) => {
	let token = req.cookies.w_auth;
	User.findByToken(token, (err, user) => {
		if (err) throw err;
		if (!user) return res.json({
				isAuth: false,
        error: true,
        msg: 'User is not defined'
      });
		req.token = token; // 이건 찾을 필요 없나?
		req.user = user;
		console.log('auth 성공');
		next();
	});
};

module.exports = { auth };
