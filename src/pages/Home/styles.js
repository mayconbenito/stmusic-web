import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  width: calc(100% - 180px);
  right: 0;
  top: 0;
  height: ${(props) =>
    props.theme.showPlayer ? 'calc(100% - 100px)' : '100%'};
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
  animation-name: fadeIn;
  animation-duration: 0.7s;
  animation-timing-function: ease-in-out;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0px;
  }

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
