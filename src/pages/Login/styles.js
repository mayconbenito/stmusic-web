import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #141414;
`;

export const Title = styled.h1`
  font-size: 34px;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const Logo = styled.img`
  width: 270px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #000;
  padding: 20px 30px 20px 30px;
  border-radius: 3px;
`;

export const Input = styled.input`
  min-width: 300px;
  height: 35px;
  padding: 3px 5px;
  border: none;
  background-color: #141414;
  color: #d99207;
  margin-bottom: 5px;
  border-radius: 3px;
  font-weight: 500;
  border-bottom: ${props => (props.warning ? '1px solid #d99207' : 'none')};

  &::placeholder {
    color: #d99207;
  }
`;

export const Submit = styled.button`
  min-width: 300px;
  height: 35px;
  padding: 3px 5px;
  border: none;
  background-color: #141414;
  color: #d99207;
  margin-bottom: 5px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: ${props => (props.warning ? '1px solid #d99207' : 'none')};
`;

export const Button = styled(Link)`
  padding: 5px 10px;
  background-color: #141414;
  color: #d99207;
  font-size: 12px;
  font-weight: 500;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  align-self: flex-start;
`;

export const WarningBox = styled.div`
  background-color: #141414;
  border-radius: 3px;
  padding: 5px 10px;
  margin-top: 5px;
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;

  span {
    font-size: 12px;
    color: #d99207;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0.5;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`;
