import '../App.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

function Test ({ isLogout, isLoggedIn }) {
  const navigate = useNavigate();

  const [data, setData]= useState();

  useEffect(() => {
    axios.get('/test')
      .then(response => {
        console.log(response.data);
        // server.js에서는 해결할 수있는 방법을 모르겠음
        //일단 프론트에서 조건에 따라 나누어주긴
        if (response.data === '로그인 하세요') {
          // Redirect to the login page or display an alert here
          alert('로그인 해주세요');
          // You can choose to redirect the user to the login page like this:
          window.location.href = '/login';
        } else {
          setData(response.data);
        }
      })
      .catch(error => {
        console.error(error);
        // Handle errors, e.g., display an alert or redirect to the login page
        alert('로그인 해주세요');
        // You can choose to redirect the user to the login page like this:

        
      });
  }, []);

  
  // useEffect(() => {
  //   axios.get('/test')
  //     .then(response => {
  //         console.log(response.data);
  //         if(response.data==='로그인 하세요') {
  //           alert('로그인 해주세요');
  //           navigate('/login')
  //         } else {
  //           setData(response.data);
  //         }
          
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       navigate('/login');
  //     });
  // }, []);

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
        : <div>로그인 해주세요</div>
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