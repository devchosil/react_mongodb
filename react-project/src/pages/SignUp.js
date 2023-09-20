
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    width: 220px;
    padding-bottom: 10px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 220px;
    padding-top: 10px;
`;
function SignUp () {
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        id: '', password:'', nickname:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async () => {
        const regExp = /[a-z]+[a-z0-9]{5,19}$/g;

        if(formData.id===''||formData.password===''||formData.nickname==='') {
            alert('빈칸을 모두 채워주세요')
        } else if(!regExp.test(formData.id)) {
            alert('아이디를 형식에 맞게 작성해주세요')
        }else {
            try {
                await axios.post('/signup', formData)
                alert('성공');
            } catch (error) {
                alert('회원가입 실패');
            }
        }
    }

    return(
        <Container>
            <form>
                <InputWrapper>
                    <label htmlFor='id'>ID</label>
                    <input
                        type='text'
                        name='id'
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="ID를 입력하세요"
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor='password'>PW</label>
                    <input
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호를 입력하세요"
                    />
                </InputWrapper>
                <InputWrapper>
                    <label htmlFor='nickname'>별명</label>
                    <input
                        name='nickname'
                        value={formData.nickname}
                        onChange={handleChange}
                        placeholder="별명을 입력하세요"
                    />
                </InputWrapper>
                <ButtonWrapper>
                    <button
                        type="submit"
                        style={{width:"100%"}}
                        onClick={handleSubmit}
                    >회원가입</button>
                </ButtonWrapper>
            </form>
        </Container>
  )

} 

export default SignUp;