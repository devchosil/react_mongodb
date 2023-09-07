
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: darkblue;
  color: white;
  display: flex;
  padding: 1rem; /* Adjust padding as needed */
`;

function Header () {

  return(
   <HeaderContainer>
        <div>메뉴1</div>
        <div>메뉴2</div>
        <div>메뉴3</div>
   </HeaderContainer>
  )

} 

export default Header;