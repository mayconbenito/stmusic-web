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

export const Title = styled.span`
  font-size: 14px;
  color: #d99207;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 500;
  cursor: pointer;
  text-align: center;
`;

export const Artist = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px;
  left: 5px;
`;

export const ArtistName = styled.span`
  width: 130px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #d99207;
  font-size: 14px;
  font-weight: 500;
  margin-left: 5px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 129px;
  margin-right: 5px;
  margin-bottom: 5px;
  position: relative;

  &:hover ${PlayButton} {
    display: block;
  }

  &:hover ${Title} {
    display: none;
  }
`;

export const AddOnPlaylist = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
