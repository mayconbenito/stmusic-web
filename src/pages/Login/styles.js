import { Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { ReactComponent as SVGLogo } from '../../assets/images/logo.svg';

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #141414;
`;

export const Logo = styled(SVGLogo)`
  min-width: 270px;
  min-height: 151.88px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  margin-top: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #000;
  padding: 20px 30px 20px 30px;
  border-radius: 3px;
  margin: 20px 0px;
`;

export const Title = styled.h1`
  font-size: 38px;
  font-weight: 500;
  margin-bottom: 15px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  color: #d99207;
  margin-bottom: 3px;
`;

export const Input = styled.input`
  min-width: 300px;
  height: 35px;
  padding: 3px 5px;
  border: none;
  font-size: 12px;
  background-color: #141414;
  color: #d99207;
  border-radius: 3px;
  font-weight: 500;

  &::placeholder {
    color: #817e7e;
  }
`;

export const InputMessage = styled.span`
  font-size: 12px;
  color: #ff1f1f;
  margin-top: 3px;
`;

export const Submit = styled.button`
  min-width: 300px;
  height: 35px;
  padding: 3px 5px;
  border: none;
  background-color: #141414;
  color: #d99207;
  margin-bottom: 10px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: ${(props) => (props.warning ? '1px solid #d99207' : 'none')};
`;

export const FormFooter = styled.div`
  border-top: 1px solid #141414;
  padding-top: 10px;
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
