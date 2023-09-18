
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: white;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding: 1rem; /* Adjust padding as needed */
  /* font-family: NeoDunggeunmo; */
`;

const HeartIcon = styled.div`
  width: 15px;
  height: 15px;
  background: linear-gradient(80deg, #a8ffe8, #ffe3cc);
  /* background: linear-gradient(45deg, #c2f8ff, #c2d9ff); */
  /* background-color: #c2d9ff; */
  position: relative;
  transform: rotate(-45deg);
  margin: 2px;

  &:before,
  &:after {
    content: '';
    width: 15px;
    height: 15px;
    background: linear-gradient(45deg, #a8ffe8, #ffe3cc);
    /* background: linear-gradient(45deg, #ff6b6b, #ff5454); */
    /* background: linear-gradient(45deg, #c2f8ff, #c2d9ff); */
    /* background-color: #c2d9ff; */
    border-radius: 50%;
    position: absolute;
  }

  &:before {
    top: -7.5px;
    left: 0;
  }

  &:after {
    top: 0;
    left: 7.5px;
  }
`;

const Menu = styled.div`
  padding-left: 15px;
  width: 180px;
  display: flex;
  justify-content: space-between;
`;
function Header () {

  const navigate = useNavigate();

  return(
   <HeaderContainer>
        <HeartIcon />
        <Menu>
          <div onClick={()=>{navigate('/test')}}>테스트</div>
          <div onClick={()=>{navigate('/signup')}}>회원가입</div>
          <div onClick={()=>{navigate('/login')}}>로그인</div>
        </Menu>
   </HeaderContainer>
  )

} 

export default Header;