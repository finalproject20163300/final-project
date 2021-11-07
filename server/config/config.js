require("dotenv").config();
module.exports = {
  SERVER_PORT : 5000,
  default : 'main',
  main : process.env.MONGO_URI,
  admin : process.env.MONGO_URI,
}