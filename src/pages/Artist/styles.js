import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  width: calc(100% - 180px);
  right: 0;
  top: 0;
  height: ${props => (props.theme.showPlayer ? 'calc(100% - 100px)' : '100%')};
  background-color: #141414;
  padding: 10px 15px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #d99207;
  padding-bottom: 5px;
`;

export const HeaderContainer = styled.div`
  display: flex;
`;

export const HeaderTitle = styled.h2`
  color: #d99207;
  font-size: 26px;
  margin-left: 5px;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

export const Meta = styled.span`
  color: #d99207;
  font-size: 16px;
  margin-right: 10px;
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: 5px;
`;

export const Button = styled.button`
  border: none;
  background-color: #d99207;
  padding: 5px 15px;
  font-size: 12px;
  border-radius: 15px;
  color: #000;
  margin-right: 5px;
  font-weight: bold;
  font-family: Roboto;
  cursor: pointer;
`;

export const Section = styled.div`
  margin-bottom: 30px;
  animation-name: fadeIn;
  animation-duration: 0.7s;
  animation-timing-function: ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    15% {
      opacity: 0.15;
    }
    30% {
      opacity: 0.3;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`;
