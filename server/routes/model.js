// express + router
const express = require("express");
const router = express.Router();



// model
const { Result } = require("../models/Result");
const Model = require("../models/Model");
const { User } = require("../models/User");
// middleware
const { auth } = require("../middleware/auth");
// const multer = require('multer');
const { json } = require("body-parser");
const { PythonShell } = require("python-shell");
const fs = require("fs")

// const upload = multer({ storage: storage }).single('file');

router.post('/getModel', (req, res) => {
    
    const options = {
            scriptPath: "server/module",
            pythonPath: '/usr/bin/python3',
            // args: [name]
        }
    // req.body.soption
    fs.copyFileSync(`uploads/${req.body.fileName}`, `execute/valid/image.png`)
    let name = 'predict'
    if (req.body.soption === '흉부') {
      name = 'predict_chest'
    }
    else if (req.body.soption === '뇌') {
      name = 'predict'
    }
    else if (req.body.soption === '무릎') {
      name = 'predict_leg'
    }
    console.log(name);
    PythonShell.run(`./${name}.py`, options, (err, result) => {
      console.log(result);
      if(err) console.log(err);
      const res_list = result.map(e => {
        const [key, value] = e.split(',')
        return {key: key, value : value}
        })
        console.log(res_list);
      // result db 저장
      var data_json = {result_user: req.body.name,
        name: req.body.fileName,
        image_path: req.body.src,
        accuracy: res_list,
        uploader: req.body.uploader
      }
      console.log(data_json);
        const data_result = new Result(data_json);
        data_result.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true,
          doc: doc,
        });
      });

        // const data = result[0].split(',').map(e => parseInt(e.replace(/[|]/g, '').trim()))
        // res.send({data: data})
    })
    
    
});

// 결과
router.post('/getResults', (req, res) => {
  // 헤당하는 모델경로를 가져와 파이썬 코드 실행 준비.
  console.log("test")
  console.log(req.body);
  Result.find({'uploader': req.body.uploader, 'result_user': req.body.result_user})
  .populate('uploader')
  .exec((err, results) => {
    console.log(results);
    if(err) return res.status(400).send(err);
    res.status(200).json({success: true, results})
    
  });
});

module.exports = router;
