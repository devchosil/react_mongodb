import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { useLocation,useNavigate } from 'react-router-dom';

const Section = styled.section`
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    /* height: 100vh; */
`;


function Write ({ isLogout, isLoggedIn }) {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title:'',
        content:''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;

        setInput({...input, [name]:value});
    }

  return (
    <div>
      <Header isLogout={isLogout} isLoggedIn={isLoggedIn}/>
      <Section>
            <form 
                className='wrtie-input' 
                onSubmit={handleSubmit}
                style={{
                    display:"flex", 
                    flexDirection:"column",
                    // alignContent:"center",
                    // justifyContent:"center",
                    width:"800px"
                }}
            >
                <input 
                    id='title'
                    name='title'
                    type="text"
                    onChange={onChangeInput}
                    value={input.title}
                    style={{marginBottom:"10px"}}
                />
                <textarea 
                    id='content'
                    name='content'
                    onChange={onChangeInput}
                    
                    value={input.content}
                    style={{height:"400px", marginBottom:"10px"}}
                />
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <button type='submit' style={{marginRight:"5px"}}>확인</button>
                    <button type='button'>목록으로</button>
                </div>
            </form>
      </Section>
    </div>
  )
}

export default Write;

