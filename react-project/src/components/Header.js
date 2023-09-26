
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const HeaderContainer = styled.header`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  /* padding-left: 15px; */
  display: flex;
  margin-right: 5px;
  /* justify-content: flex-start; */
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  width: 80px;
  font-size: 16px;
  font-family: NeoDunggeunmo;
  cursor: pointer;
`;

function Header ({ isLogout, isLoggedIn }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get('/logout'); // Make a GET request to the /logout route
      console.log(response);
      isLogout();
      navigate('/login'); // Redirect to the home page after logout
    } catch (error) {
        console.error(error);
    }
  }

  return(
   <HeaderContainer>
        <Menu>
          {/* <HeartIcon /> */}
          <Button onClick={()=>{navigate('/test')}}>테스트</Button>
          <Button onClick={()=>{navigate('/signup')}}>회원가입</Button>
          <Button onClick={()=>{navigate('/login')}}>로그인</Button>
        </Menu>
        {/* 근데 로그인안하면 페이지 접속을 못하니까 상관이 없을까 */}
        { isLoggedIn 
          && <Menu>
              <Button onClick={handleLogout}>로그아웃</Button>
            </Menu>
        }
   </HeaderContainer>
  )

} 

export default Header;