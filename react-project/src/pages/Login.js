import '../App.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Container = styled.section`
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 200px;
    padding-bottom: 10px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 200px;
    padding-top: 10px;
`;

function Login () {

  const navigate = useNavigate();

  return(
    <Container>
        <InputWrapper>
            <span>ID</span>
            <form>
                <input
                    placeholder="ID를 입력하세요"
                />
            </form> 
        </InputWrapper>
        <InputWrapper>
            <span>PW</span>
            <form>
                <input
                    placeholder="비밀번호를 입력하세요"
                />
            </form> 
        </InputWrapper>
        <ButtonWrapper>
            <button style={{width:"90px"}}>로그인</button>
            <button 
                style={{width:"90px"}}
                onClick={()=>navigate('/signup')}
            >회원가입</button>
        </ButtonWrapper>
            
    </Container>
  )

} 

export default Login;