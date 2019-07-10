import styled from 'styled-components';

export const Opacity = styled.div`
  display: none;
  background: rgba(0, 0, 0, 0.4);
  width: 60px;
  height: 60px;
  border-radius: 100%;
  top: -0%;
  overflow: hidden;
  position: absolute;
  cursor: pointer;
  animation-name: fadeIn;
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    30% {
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  position: relative;

  &:hover ${Opacity} {
    display: block;
  }
`;

export const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
`;

export const Name = styled.span`
  width: 80px;
  font-weight: 500;
  color: #d99207;
  margin-top: 3px;
  text-align: center;
`;
