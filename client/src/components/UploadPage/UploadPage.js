import { PlusOutlined } from '@ant-design/icons';
import {Button, Form, message, Typography, Input} from 'antd';
import axios from 'axios';
import { SERVER } from 'components/Config';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const {Title} = Typography;
const PrivateOption = [
  {value: 0, label : "Private"},
  {value: 1, label : "Public"},
]

const ClassItem =[
  {value: 0, label : "흉부"},
  {value: 1, label : "무릎"},
  {value: 2, label : "..."},
]

function UploadPage() {
  const user = useSelector(state => state.user);
  const history = useHistory();

  const [image, setImage] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Type, setType] = useState(ClassItem[0].label);
  const [FileName, setFileName] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");
  const [userName, setUserName] = useState("")
  const [imgsrc, setimgsrc] = useState("")
  const [imgDisplay, setimgDisplay] = useState('none')
  const [lineDisplay, setlineDisplay] = useState('block')
  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  }

  const onTypeChange = (e) => {
    setType(ClassItem[e.currentTarget.value].label);
  }

  const onUserChange = (e) => {
    setUserName(e.currentTarget.value)
  }


  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header : {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])
    console.log(files);
    axios.post(`${SERVER}/api/image/uploadFiles`, formData, config)
    .then(res => {
      if(res.data.success){
        console.log(res.data);
        setFileName(res.data.fileName);
        setFilePath(res.data.url);
        setimgsrc(res.data.url)
        setimgDisplay('block')
        setlineDisplay('none')
        // size
      } else {
        alert('업로드를 실패했습니다. 조건을 확인해주세요.');
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      uploader: user.auth._id,
      fileName: FileName,
      filePath: FilePath,
      thumbnail: ThumbnailPath,
      privacy: Private,
      type: userName,
    }
    if(variables.fileName === ''){
      alert('이미지 업로드에 실패했습니다.');
      return
    }
    axios.post(`${SERVER}/api/image/uploadImage/`, variables)
    .then(res => {
      if(res.data.success){
        console.log(res.data);
        message.success('성공적으로 업로드했습니다.');
        setTimeout(() => {
          history.push('/project/landing');          
        }, 3000);
      } else {
        alert('이미지 업로드에 실패했습니다.');
      }
    })
    .catch(err => {
      console.error(err);
    });
  }
  
  return (
    <>
    <div style={{maxWidth: '100%', margin: '0rem'}}>
      <div style={{textAlign: 'left', marginBottom: '0rem'}}>
      <Title style={{color: '#444'}} level={2}>이미지 업로드</Title>
      </div>
    <Form onSubmit={onSubmit} style={{marginLeft: '0rem'}}>
      {/* space-between */}
      <div style={{ display : 'flex'}}> 
      <Dropzone 
      onDrop={onDrop}
      multiple={false}
      maxSize={8000000}
      >
        {({ getRootProps, getInputProps}) => (
          
          <div style={{ width: '50rem', height: '50rem', border: '1px solid lightgray', display : 'flex',
          alignItems : 'center', justifyContent : 'center'}} {...getRootProps()}
          >
            <img style={{width: '100%', height: '100%', display: imgDisplay}} src={`http://34.64.219.37:5000/${imgsrc}`} alt={''}/>
          <input {...getInputProps()} />
          <PlusOutlined style={{fontSize: '3rem', display: lineDisplay}} />
          </div>
        )}
      </Dropzone>
      <div style={{margin: '0 0rem 0 3rem'}}>
      <Input style={{ width: '50rem', height: '5rem', margin: '0 0rem 0 0rem', display: 'block'}} onChange={onUserChange}
      placeholder='환자명'></Input> 
      {/* <select onChange={onTypeChange}>
        {ClassItem.map((item, index) => (
          <option key={index} value={item.value}>{item.label}</option>
        ))}
      </select> */}
      <Button style={{ width: '50rem', height: '5rem', margin: '2rem  0 0 0rem', display: 'block'}} type="primary" size="large" onClick={onSubmit}>이미지 업로드</Button>
      </div>
      </div>

      {/* 공개설정 : <select onChange={onPrivateChange}>
        {PrivateOption.map((item, index) => (
          <option key={index} value={item.value}>{item.label}</option>
        ))}
      </select> */}

      

    </Form>
    </div>
    </>
  )
}
export default UploadPage;