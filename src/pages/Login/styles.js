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
  background-color: ${(props) => props.theme.colors.darkestGray};
`;

export const Logo = styled(SVGLogo)`
  min-width: 270px;
  min-height: 151.88px;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  margin-top: ${(props) => props.theme.spacing.large}; ;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.black};
  padding: ${(props) =>
    `${props.theme.spacing.large} ${props.theme.spacing.largest} ${props.theme.spacing.large} ${props.theme.spacing.largest}`};

  border-radius: ${(props) => props.theme.spacing.tiny};
  margin: ${(props) => props.theme.spacing.large} 0px;
`;

export const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.extraLargeFontSize};
  font-weight: 500;
  margin-bottom: ${(props) => props.theme.spacing.base};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

export const InputLabel = styled.label`
  font-size: ${(props) => props.theme.spacing.smallFontSize};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.tiny};
`;

export const Input = styled.input`
  min-width: 300px;
  height: 35px;
  padding: ${(props) =>
    `${props.theme.spacing.tiny} ${props.theme.spacing.smallest}`};
  border: none;
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
  background-color: ${(props) => props.theme.colors.darkestGray};
  color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.spacing.tiny};
  font-weight: 500;

  &::placeholder {
    color: ${(props) => props.theme.colors.darkGray};
  }
`;

export const InputMessage = styled.span`
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
  color: ${(props) => props.theme.colors.red};
  margin-top: 3px;
`;

export const Submit = styled.button`
  min-width: 300px;
  height: 35px;
  padding: ${(props) =>
    `${props.theme.spacing.tiny} ${props.theme.spacing.smallest}`};
  border: none;
  background-color: ${(props) => props.theme.colors.darkestGray};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.spacing.tiny};
  font-weight: 500;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.warning ? `1px solid ${props.theme.colors.primary}` : 'none'};

  &:hover {
    background-color: #202020;
  }
`;

export const FormFooter = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.darkestGray};
  padding-top: ${(props) => props.theme.spacing.small};
`;

export const Button = styled(Link)`
  padding: ${(props) =>
    `${props.theme.spacing.smallest} ${props.theme.spacing.small}`};
  background-color: ${(props) => props.theme.colors.darkestGray};
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
  font-weight: 500;
  border-radius: ${(props) => props.theme.spacing.tiny};
  cursor: pointer;
  border: none;
  align-self: flex-start;

  &:hover {
    background-color: #202020;
  }
`;
