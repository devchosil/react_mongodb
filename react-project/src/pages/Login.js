import '../App.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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

    const [inputData,setInputData] = useState({
        id:'',
        password:''
    });

    const onChangeData = (e) => {
        const { name, value } = e.target;
        setInputData({...inputData, [name]: value});
    }

    const onLogin = async () => {
        try {
            const response = await axios.post('/login', inputData);
            console.log(response);
            if(typeof response.data === 'object') {
                alert('로그인에 성공했습니다.');
                // Redirect to the '/test' page on the client side
                navigate('/', { state: {user:response.data}});
            } else {
                alert('로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error(error);
            alert('로그인에 실패했습니다.');
        }
    }

    return(
    <Container>
        <InputWrapper>
            <span>ID</span>
            <form>
                <input
                    name='id'
                    placeholder="ID를 입력하세요"
                    value={inputData.id}
                    onChange={onChangeData}
                />
            </form> 
        </InputWrapper>
        <InputWrapper>
            <span>PW</span>
            <form>
                <input
                    name='password'
                    placeholder="비밀번호를 입력하세요"
                    value={inputData.password}
                    onChange={onChangeData}
                />
            </form> 
        </InputWrapper>
        <ButtonWrapper>
            <button 
                style={{width:"90px"}}
                onClick={onLogin}
            >로그인</button>
            <button 
                style={{width:"90px"}}
                onClick={()=>navigate('/signup')}
            >회원가입</button>
        </ButtonWrapper>    
    </Container>
  )

} 

export default Login;