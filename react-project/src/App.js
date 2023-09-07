import axios from 'axios';
import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home () {

  return(
    <div>홈입니다.</div>
  )

} 

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

function App() {

  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/test" element={<Test/>} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
