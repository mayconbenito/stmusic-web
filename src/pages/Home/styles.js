import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  width: calc(100% - 180px);
  right: 0;
  top: 0;
  height: ${props => (props.theme.showPlayer ? 'calc(100% - 100px)' : '100%')};
  background-color: #141414;
  padding: 10px 15px;
  overflow-y: scroll;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const ContentTitle = styled.h2`
  font-size: 40px;
  font-weight: normal;
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

export const GenreTitle = styled.span`
  font-size: 18px;
  color: #d99207;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 500;
  cursor: pointer;
  text-align: center;
`;

export const GenreItem = styled.div`
  display: flex;
  width: 260px;
  height: 146px;
  margin-right: 5px;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const GenreImage = styled.div`
  width: 260px;
  height: 146px;
  background-color: #4d120f;
`;
