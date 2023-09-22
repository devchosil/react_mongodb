import '../App.css';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';

function Test ({ isLogout, isLoggedIn }) {
  const [data, setData]= useState();
  
  useEffect(() => {
    axios.get('/test')
      .then(response => {
          console.log(response.data);
          setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return(
    <>
      <Header isLogout={isLogout} isLoggedIn={isLoggedIn}/>
      <div>
        <h3>테스트</h3>
        <div></div>
      </div>
      {
        (data !== null && data !== undefined && typeof data !== 'string')
        ? <div>아이디 {data?.id}님이 로그인하셨습니다.</div>
        : <div>로그인에 실패 했습니다.</div>
      }
      {/* {
        data?.map(element => {
          return(
            <div style={{padding:"20px 100px", textAlign:"left"}}>
              <div>아이디: {element.id}</div>
              <div>비밀번호: {element.password}</div>
              <div>닉네임: {element.nickname}</div>
            </div>
          )
        })
      } */}
    </>
  )
} 

  export default Test;