// express + router
const express = require("express");
const router = express.Router();

// model
const Image = require("../models/Image");

// middleware
const { auth } = require("../middleware/auth");
const multer = require('multer');
const { json } = require("body-parser");


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if(ext !== '.jpg' || ext !== '.png'){
      return cb(res.status(400).end('only jpg, png is allowed'), false);
    }
    cb(null, true);
  }
});

const upload = multer({ storage: storage }).single('file');

router.post('/uploadFiles', (req, res) => {
  // 파일을 서버에 저장한다.
  upload(req, res, err => {
    if(err){
      return res.json({
        success: false,
        err: err
      })
    }
    return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
  })
});

router.post('/uploadImage', (req, res) => {
  // 이미지 정보들을 저장한다.
  const image = new Image(req.body);
  image.save((err, doc) => {
    if(err){
      return res.json({ success: false, err })
    }
    res.status(200).json({ success: true })
  });
});

router.post('/getImages', auth, (req, res) => {
  // 이미지를 DB에서 가져와 클라이언트에 보낸다.
  console.log(req.body);
  Image.find({'uploader': req.user._id, 'type': req.body.type})
  .populate('uploader')
  .exec((err, images) => {
    if(err) return res.status(400).send(err);
    res.status(200).json({success: true, images})
  });
});


module.exports = router;
