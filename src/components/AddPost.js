import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
/*COMPONENTS*/
import Header from './Header';
const AddPost = () => {
   const navigate = useNavigate();
   const [is_login, setIsLogin] = useState(true);
   const title = React.useRef(null);
   const content = React.useRef(null);
   const [imageSrc, setImageSrc] = useState('');
   const img = React.useRef(null);
   const file_link = React.useRef(null);
   const [imgFile, setImgFile] = React.useState(null);

 

   const timeStamp = new Date();
   const timePosted =
      timeStamp.toDateString() +
      ' (' +
      timeStamp.getHours() +
      ':' +
      timeStamp.getMinutes() +
      ' )';

  const selectFile = (e) => {
    console.log(e.target.files[0]);
    setImgFile(e.target.files[0]);
  }



  const addPostAxios = () => {
    const formData = new FormData();
    formData.append("imgUrl", imgFile);
    formData.append("title", title.current?.value);
    formData.append("content",content.current.value);
  
    console.log("data => ", formData);


    console.log('localStorage', localStorage.getItem('login-token'));
    axios({
      method: "post",
      url: 'http://15.164.164.17/api/boards',
      headers: {"Content-Type": "multipart/form-data",
      Authorization: "Bearer " + localStorage.getItem('login-token')},
      data: formData
    })
       .then(function (response) {
         window.alert('게시물이 등록되었습니다.');
         navigate('/');
       })
       .catch(function (error) {
        const msg = error.response.data.msg;
        console.log(error);
          alert('양식을 모두 채워주세요.');
       });
 };
 

   return (
      <>
         <Header />
         <Container>
            <Card>
               <Form>
                  <ButtonUpload onClick={addPostAxios}>업로드</ButtonUpload>
                  <br />
                  <Title>Title</Title>
                  <Input
                     ref={title}
                     type="text"
                     placeholder="제목을 입력하세요."
                     maxlength="18"
                  />
                  <br />

                  <SubTitle>Choose Image</SubTitle>
                  <Label className="input-file-button" htmlFor="input-file">
                     <InputFile type="file" id="input-file" onChange={selectFile} />
                     사진선택
                  </Label>
                  <Preview>
                     {imageSrc && (
                        <img
                           src={imageSrc}
                           alt="preview-img"
                           style={{ width: 100 }}
                        />
                     )}
                  </Preview>
                  <br />
                  <SubTitle2>Contents</SubTitle2>
                  <Textarea
                     ref={content}
                     type="text"
                     placeholder="내용을 입력하세요."
                  />
               </Form>
            </Card>
         </Container>
      </>
   );
};
const Container = styled.div`
   display: flex;
   width: 100vw;
   height: 100vh;
   align-items: center;
   justify-content: center;
   position: relative;
   top: 50%;
   margin: 20px auto;
   padding: 20px auto;
`;
const Card = styled.div`
   max-width: 350px;
   width: 95%;
   padding: 1em;
   margin: 1em;
   border: 1px solid #transparent;
   border-radius: 5px;
   background: transparent;
   box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
      0 8px 16px -8px hsla(0, 0%, 0%, 0.3),
      0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
   transition: all ease 200ms;
   &:hover,
   &:focus,
   &:active {
      cursor: pointer;
   }
`;
const Form = styled.div`
   margin: 20px auto;
`;
const ButtonUpload = styled.button`
   display: flex;
   flex-direction: column;
   position: relative;
   left: 10px;
   bottom: 25px;
   float: right;
   width: 65px;
   height: 27px;
   margin: 5px 10px;
   padding: 5px;
   align-items: center;
   justify-content: center;
   margin: 0 5px;
   padding: 6px 10px;
   color: #000;
   background-color: #e0e0e0;
   border: 1px solid #e0e0e0;
   border-radius: 5px;
   &:hover,
   &:active,
   &:focus {
      cursor: pointer;
      background-color: #ea9cc3;
      border: 1px solid #ea9cc3;
   }
`;
const TimePosted = styled.div`
   display: inline;
   width: 190px;
   position: relative;
   bottom: 10px;
   justify-content: center;
   font-size: 13px;
   color: #ea9cc3;
   text-align: center;
`;

const Title = styled.p`
   margin: 3px auto;
   line-height: 5px;
`;

const SubTitle = styled.span`
   line-height: 5px;
`;
const SubTitle2 = styled.p` 
   position: relative;
   top: 10px;
   margin: 10px 0;
   line-height: 5px;
`;
const Input = styled.input`
   position: relative;
   bottom: 10px;
   margin: 15px 0;
   padding: 5px auto;
   width: 95%;
   max-width: 200px;
   line-height: 11px;
   background-color: transparent;
   color: #282C34;
   border: none;
   border-bottom: 1px solid #282C34;
   &:hover,
   &:focus,
   &:active {
      cursor: pointer;
      border-bottom: 1px solid #EA9CC3;
      outline-color:#edb6d1;

   }
`;
const InputFile = styled.input`
   display: none;
   width: 100px;
   max-height:40px;
   background-color: whitesmoke;
   color: #282c34;
   border: none;
   border-bottom: 1px solid #282c34;
`;
const Label = styled.label`
   margin: auto 5px;
   padding: 2px 4px;
   color: #000;
   background-color: #e0e0e0;
   border: 1px solid #e0e0e0;
   border-radius: 5px;
`;
const Preview = styled.div`
width: 300px;
`;
const Textarea = styled.textarea`
   position: relative;
   top: 10px;
   width: 75%;
   height: 110px;
   padding: 10px;
   overflow-x: hidden;
   overflow-y: auto;
   background-color: transparent;
   border: solid 1px #282c34;
   border-radius: 5px;
   resize: none;
   &:hover,
   &:focus,
   &:active {
      cursor: pointer;
      border: 1px solid #ea9cc3;
      outline-color:#edb6d1;
   }
`;
export default AddPost;