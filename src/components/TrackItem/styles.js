import styled from 'styled-components';

export const Opacity = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  top: -0%;
  overflow: hidden;
  position: absolute;
  transition: 0.5s;
`;

export const PlayButton = styled.div`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
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
    50% {
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
  position: relative;
  flex-direction: column;
  margin-right: 5px;
  margin-bottom: 5px;
`;

export const AddOnPlaylist = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 500;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3px;
  cursor: pointer;
`;

export const Type = styled.span`
  color: #606060;
`;

export const Name = styled.span`
  width: 150px;
  color: #d99207;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TextList = styled.span`
  flex-direction: row;
  color: #606060;
  font-size: 10px;
`;

export const ArtistName = styled.span`
  color: #606060;
`;
