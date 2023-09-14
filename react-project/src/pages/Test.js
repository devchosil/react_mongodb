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
                <div>번호: {element._id}</div>
                <div>제목: {element.이름}</div>
                <div>날짜: {element.날짜}</div>
              </div>
            )
          })
        }
      </>
    )
  
  } 

  export default Test;