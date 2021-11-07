import ex_img from "source/img/ex.png";
import axios from 'axios';
import { SERVER } from 'components/Config';
import React, { useEffect, useState } from 'react';

import { Card, Typography, Row, Col, Image, List, Progress, Input } from 'antd';
import { useSelector } from "react-redux";
import { Button } from "antd/lib/radio";
const { Title } = Typography;
const { Meta } = Card;

function ModelPage() {
  const [ThImage, setImage] = useState([]);
  const [renderResult, setRenderResult] = useState(<List.Item></List.Item>)
  const [searchName, setSearchName] = useState('')
  const [onCheck, setonCheck] = useState(false)
  const user = useSelector(state => state.user);

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
  const processData = (imgs) => {
    console.log(imgs);
    const data = imgs.map((img, idx) => ({
      key: idx,
      result_user: img.result_user,
      accuracy: img.accuracy,
      image_path: img.image_path
    }))

    setImage(data)
  }

  function onSearch(){
    axios.post(`${SERVER}/api/model/getResults`, {result_user: searchName, uploader: user.auth._id})
    .then(res => {
      console.log(searchName);
      if(res.data.success){
        processData(res.data.results)

        setRenderResult(ThImage.map((image, index) => {
          return <List.Item style={{backgroundColor:'#fff', padding: '1rem 5rem 1rem 5rem', marginBottom: '1rem', width: '50rem'}} key={image.key} lg={6} md={8} xs={24}>
              <Image style={{width: '140px', height: '140px'}} src={`${image.image_path}`} alt='thumbnail'/>
              {/* <Progress style={{width: '140px'}} percent={100}/> */}
              <div>
              {image.accuracy.map(e => {
                return <>
                <p style={{textAlign: 'left', marginLeft: '1rem'}}>
                  {e.key} : {e.value}
                </p>
                </>
              })}
              </div>
              
            </List.Item>
        }))
        
        
        
      }
    });
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
    <div style={{width: '100%', margin: '0rem 0 1rem 0', textAlign: 'left'}}>
      <Title style={{color: '#444'}} level={2}> 예측결과 확인 </Title>
      <Input style={{ width: "82%", height: '3rem', margin: '0' }} placeholder='환자 검색' onChange={onSearchName}></Input>
      <Button style={{ width: "17%", height: '3rem', textAlign: 'center', marginLeft: '1rem' }} onClick={onButton}>환자 검색</Button>
      <div style={{borderBottom: 'solid 1px #eee', margin:'1rem 0 1rem 0'}}/>
      <Row  style={{justifyContent: 'center'}} gutter={[32, 16]}>
        <List style={{marginLeft: '0rem'}}>
        {renderResult}
        </List>
      </Row>
    </div>
    </> 
  );
}

export default ModelPage;