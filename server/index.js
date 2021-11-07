// ENV
require("dotenv").config();

// DEPENDENCIES 
// Using Node.js `require()`
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors"); 

// module
const config = require("./config/config");
const mongo = require("./module/mongo");

// models
const User = require("./models/User");
const { auth } = require("./middleware/auth");

// app(Express) server client?
const app = express();
// app use

// mongoose
mongo.Connect("main");

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// mongodb.real();
// const model1 = mongo.model('User',User.userSchema);
// model1.findOne({email:"test"}, function(err, obj){console.log(obj);});
// setTimeout(function() {
//   console.log('Works!');
// }, 10000);
// const db = mongoose.connection.;

// mongoose.connection.on('connected',()=>{
// 	console.log('연결 상태 체크 :: 연결 성공');
// });

// Route
// Root Directory

app.get("/", (req, res) => {
	res.send("Backend api Page please link to api/users/book or api/test/main");
});
app.use("/uploads", express.static("uploads"));
app.use("/execute", express.static("execute"));
app.use("/module", express.static("module"));
app.use("/api/users", require("./routes/users"));
app.use("/api/image", require("./routes/image"));
app.use("/api/model", require("./routes/model"));

app.use("/test", require("./routes/test"));


// app.all('/secret', function (req, res, next) {
//   console.log('Accessing the secret section ...');
//   next();
// })

// PORT SERVER LISTEN
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`[백엔드 실행] http://34.64.219.37:${port}`);
});