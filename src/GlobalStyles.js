import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    outline: 0;
  }

  img {
    pointer-events: none
  }

  span {
    font-family: Roboto, sans-serif;
  }

  a, p, h1, h2, h3 {
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

  .slick-slide {
    /* width: auto !important; */
  }

  .slick-track {
    margin-left: 0 !important
  }
`;
