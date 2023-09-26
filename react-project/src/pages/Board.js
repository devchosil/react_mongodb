import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import { useLocation,useNavigate } from 'react-router-dom';

const Section = styled.section`
    display:flex;
    justify-content: center;
    align-items: flex-start;
    /* width:1000px; */
    height: 100vh;
`;

const Table = styled.table`
    width:1000px;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    border-spacing: 0;

    thead {
        tr {

            background-color: #d6d6d6;
            td {
                border-bottom: 1px solid gray;
                border-right: 1px solid gray;
            }
            td:last-child {
                border-right: none;
            }
        }
    }

    tbody {
        tr {
            td {
                border-right: 1px solid gray;
            }
            td:last-child {
                border-right: none;
            }
        }
    }
`;

// const THeadColumn = styled.td`
//     border-bottom: 1px solid gray;

//     thead {
//         tr {
//             td {
//                 border-bottom: 1px solid gray;
//             }
//         }
//     }
    
// `;


function Board ({ isLogout, isLoggedIn }) {
    const navigate = useNavigate();

  return (
    <div>
      <Header isLogout={isLogout} isLoggedIn={isLoggedIn}/>
      <Section>
        <Table>
            <thead>
                <tr>
                    <td>글번호</td>
                    <td>제목</td>
                    <td>날짜</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>데이터 받아와서 내용넣기</td>
                    <td>글제목 내용넣기</td>
                    <td>날짜 내용넣기</td>
                </tr>
            </tbody>
        </Table>
      </Section>
    </div>
  )
}

export default Board;