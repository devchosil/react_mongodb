import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';


function Main () {
  const location = useLocation();
  const user = location.state?.user;

  useEffect(()=>{
    console.log(user);
  })
    return(
      <>
        <Header></Header>
        <div>홈입니다.</div>
      </>
    )
  }
  
  export default Main;