

/*
1. 이름
2. 생년월일
3. 집주소
4. 연락처
5. 부가 정보
6. 여러 정보
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  name : {
    type: String,
    maxlength: 50,
  },
  birth: {
    type: String,
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },

})