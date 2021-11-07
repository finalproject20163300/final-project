import fs from 'fs';
import { Card, Typography, Row, Col, Image, Input, Button, Spin, Alert, List } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import axios from 'axios';
import { SERVER } from 'components/Config';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';


const { Title } = Typography;
const { Meta } = Card;

function Index() {
  const [ThImage, setImage] = useState([]);
  const [renderResult, setRenderResult] = useState(<List style={{flex: '1', justifyContent: 'center', alignContent:'center'}}></List>)
  const [searchName, setSearchName] = useState('')
  const [spinning_r, setspinning_r] = useState(false)
  const [onCheck, setonCheck] = useState(false)
  const user = useSelector(state => state.user);

  const processData = (imgs) => {
    const data = imgs.map((img, idx) => ({
      key: idx,
      fileName: img.fileName,
      value: '흉부'
    }))

    setImage(data)
  }

  const onChangeOption = (e, idx) => {
    const newData = [...ThImage]
    newData[idx].value = e.target.value
    setImage(newData)
  }
  const onSearchName = (e) => {
    setSearchName(e.currentTarget.value)
    console.log(searchName);
  }
  const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  const timer = async () => {
      await _sleep(1000);
      setonCheck(true)
  };

  function onButton(){
    onSearch()
    timer()
    
  }
  function onSearch(){
    axios.post(`${SERVER}/api/image/getImages`, {type: searchName},{
      withCredentials: true})
    .then(res => {
      if(res.data.success){
        processData(res.data.images)
        //  console.log(res.data);
        //  console.log(res.data.images);
          setRenderResult(ThImage.map((image, index) => {
          var src = 'http://34.64.241.97:5000/uploads/'+image.fileName
          // 이미지 저장

          return <Col key={image.key} lg={6} md={8} xs={24}>
            {/* <a href={`image/post/${image._id}`}> */}
              <div style={{width: '28rem', height: '100%', backgroundColor:'#fff', padding:'2rem', position: 'relative'}}>
                <Image style={{width: '240px', height: '240px'}} src={`http://34.64.241.97:5000/uploads/${image.fileName}`} alt='thumbnail'/>
                <select style={{ width: "100%", margin: '0 auto' }} onChange={(e) => onChangeOption(e , image.key)}>
                  <option value='흉부'>흉부</option>)
                  <option value='무릎'>무릎</option>
                  <option value='뇌'>뇌</option>
                </select>
                <Button style={{ width: "100%", margin: '1rem auto' }} onClick={() => model_execute(image.fileName, src, image.key)}>실행</Button>
                
              </div>
            {/* </a> */}
            <Meta
            // avatar={<Avatar src={`http://localhost:5000/${image.filePath}`}/>}
            // title={image.fileName}
            description=""
            />
      </Col>
      }))

      } else {
        console.log('불러올 이미지가 없습니다.');
      }
    });
    
  }
  
  function model_execute(fileName, src, idx) {
    setspinning_r(true)
    
    var data_json = {fileName: fileName,
      src: src,
      name: searchName,
      soption: ThImage[idx].value,
      uploader: user.auth._id
      }
    const request = axios
      .post(`http://34.64.241.97:5000/api/model/getModel`, data_json)
      .then( (res) => setspinning_r(false)  )
    
  }



  useEffect(() => {
    // axios.post(`${SERVER}/api/image/getImages`, {type: searchName},{
    //   withCredentials: true})
    // .then(res => {
    //   if(res.data.success){
    //      console.log(res.data);
    //      setImage(res.data.images);
    //   } else {
    //     console.log('불러올 이미지가 없습니다.');
    //   }
    // });
    
    // setonCheck(true)
    // if(onCheck==false){
      // onSearch()
    // }
    if(onCheck==true){
      onSearch()
        console.log(renderResult)
    }
    setonCheck(false)
  }, [onCheck]);

  return (
    <>
    <Spin spinning={spinning_r} tip="Loading...">
    <div style={{width: '100%', margin: '0rem', textAlign: 'left'}}>
    <Title style={{color: '#444'}} level={2}> 이미지 선택 </Title>
      <Input style={{ width: "82%", height: '4rem' }} placeholder='환자 검색' onChange={onSearchName}></Input>
      <Button style={{ width: "17%", height: '4rem', marginLeft: '1rem' }} onClick={onButton}>환자 검색</Button>
      <div style={{borderBottom: 'solid 1px #eee', margin:'1rem 0 1rem 0'}}/>
      <Row style={{}} gutter={[32, 16]}>
        {renderResult}
      </Row>
    </div>
    
    
  </Spin>
    </> 
  );
}

export default Index;