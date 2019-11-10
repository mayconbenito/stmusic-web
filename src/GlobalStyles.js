import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    outline: 0;
  }

  a, p, h1, h2, h3, span {
    color: #d99207;
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
    background-color: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d99207;
  }
`;
