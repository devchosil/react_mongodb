import '../App.css';
import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import axios from 'axios';

function Test () {

    const [data, setData]= useState();
    
    useEffect(() => {
      axios.get('/test')
        .then(response => {
          setData(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
    return(
      <>
        <Header></Header>
        <div>
          <h3>테스트</h3>
        </div>
        {
          data?.map(element => {
            return(
              <div style={{padding:"20px 100px", textAlign:"left"}}>
                <div>아이디: {element.id}</div>
                <div>비밀번호: {element.password}</div>
                <div>닉네임: {element.nickname}</div>
              </div>
            )
          })
        }
      </>
    )
  
  } 

  export default Test;