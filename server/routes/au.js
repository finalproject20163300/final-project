const { User } = require("../models/User");

function auth(req, res, next) {
	var token = req.cookies.w_auth;
	console.log(token);
	User.findByToken(token, (err, user) => {
		if (err) throw err;
		if (!user)
			return res.json({
				isAuth: false,
        error: true,
        msg: 'User is not defined'
      });
		req.token = token; // 이건 찾을 필요 없나?
		req.user = user;
		console.log(user);
		next();
	});
};
module.exports = { auth };