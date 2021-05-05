import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background-color: ${(props) => props.theme.colors.darkestGray};
  }

  span, a, p, label, h1, h2, h3 {
    color: ${(props) => props.theme.colors.primary};
    font-family: Roboto, sans-serif;
  }

  button {
    font-family: Roboto, sans-serif;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.white};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
