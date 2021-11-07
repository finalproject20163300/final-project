const mongoose = require("mongoose");
const config = require("../config/config");
const { User, userSchema } = require("../models/User");

async function Connect(name) {
	await mongoose
		.connect(config[name], {
			useNewUrlParser: true, useUnifiedTopology: true,
			useCreateIndex: true, useFindAndModify: false,
		})
		.then(() => {
			console.log("[MongoDB] 연결 성공");
		})
		.catch((e) => console.error("[ERROR]", e.reason));
}

async function createConnect(name) {
	mongoose.Promise = global.Promise;
	return await mongoose
		.createConnection(config[name], {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			// useFindAndModify: false,
		})
		.then(() => {
			console.log("[MongoDB] 다중 연결 성공");
		})
		.catch((e) => console.error("[ERROR]", e.reason));

	// client (console.log('successfully connected to mongodb..'));
	//client.catch(e => console.error(e));
	// .catch(e => console.error(e));
}

async function connectDB(name) {
	const myDB = await mongoose
		.connect(config[name], {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})
		.then(() => {})
		.catch((e) => console.error("[ERROR]", e.reason));
	//myDB.users.model("User", userSchema);
}

async function Cre(uri) {
	try {
		const client = await mongoose
			.createConnection(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			})
			.then(() => {
				console.log("[MongoDB] 다중 연결 성공");
				return client;
			})
			.catch((e) => console.error("[ERROR]", e.reason));
	} catch (e) {
		console.error(e.reason);
	}
	// client (console.log('successfully connected to mongodb..'));
	//client.catch(e => console.error(e));
	// .catch(e => console.error(e));
}

function real() {
	const conn = mongoose.createConnection(config["main"], {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	const conn2 = mongoose.createConnection(config["main"], {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	const model1 = conn.model("User", userSchema);
	const model2 = conn2.model("User", userSchema);
	model2.find({}, function (err, obj) {
		console.log(obj);
	});
}
// client.close(); 연결 해제
module.exports = { createConnect, Connect, connectDB, real };
