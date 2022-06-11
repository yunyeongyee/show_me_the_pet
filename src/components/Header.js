import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
/*COMPONENTS*/
/*CSS*/
import '../App.css';

const Header = (props) => {
   const navigate = useNavigate();
   const [isLogin, setIsLogin] = React.useState(false);
   const [btnState, setBtnState] = React.useState();

   const loginCheck = async (user) => {
      if (user) {
         setIsLogin(true);
         setBtnState('LogOut');
      } else {
         setIsLogin(false);
         setBtnState('Login');
      }
   };
   // React.useEffect(() => {
   //    onAuthStateChanged(auth, loginCheck);
   // }, []);

   const ClickLogin = () => {
      // signOut(auth);
      navigate('/Login');
   };

   return (
      <>
         <header className="Header">
            <h1
               className="HeaderTitle"
               onClick={() => {
                  window.location.replace('/');
               }}
            >
              쇼미더펫
            </h1>
            <nav>
               <ButtonLogIn onClick={ClickLogin}>Login</ButtonLogIn>
            </nav>
         </header>
      </>
   );
};
const ButtonLogIn = styled.button`
   width: 67px;
   height: 30px;
   float: right;
   margin: 20px 10px;
   padding: 5px;
   align-items: center;
   justify-content: center;
   color: #fff;
   background-color: #ea9cc3;
   border: 1px solid #ea9cc3;
   border-radius: 5px;

   @keyframes push {
      50% {
         transform: scale(0.85);
      }
      100% {
         transform: scale(1);
      }
   }
   &:hover,
   &:active,
   &:focus {
      cursor: pointer;
      animation-name: push;
      animation-duration: 0.4s;
      animation-timing-function: linear;
      animation-iteration-count: 1;
   }
`;
export default Header;