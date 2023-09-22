import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

function Main ({ isLogout, isLoggedIn }) {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div>
      <Header isLogout={isLogout} isLoggedIn={isLoggedIn}/>
      <div>홈입니다.</div>
    </div>
  )
}

export default Main;