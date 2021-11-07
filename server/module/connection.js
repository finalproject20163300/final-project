const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.Promise = global.Promise;

function createConnect(name) {
	return mongoose.createConnection(config[name], {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		// useFindAndModify: false,
	});
	// .then(() => {
	// 	console.log("[MongoDB] 다중 연결 성공");
	// 	return;
	// })
	// .catch((e) => console.error("[ERROR]", e.reason));
}

module.exports = { createConnect };
// module.exports.on = {createConnection};
