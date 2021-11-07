const express = require('express');
const { auth } = require('./au');
const router = express.Router();


router.get('/main', (req, res) => {
  auth(req);
  res.send('test main page.');
});

router.get("/au", auth, (req, res) => {
	// 성공 시에만
  res.send('test auth page.');
});
module.exports = router;