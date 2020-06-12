import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  bottom: 0;
  background-color: #141414;
  border-top: 3px solid #000;
  padding: 15px;
  animation-name: fadeIn;
  animation-duration: 0.6s;
  animation-timing-function: ease-in;

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

export const TrackInfo = styled.div`
  display: flex;
  flex: 1;
`;

export const TrackTexts = styled.div`
  display: flex;
  width: 160px;
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;
`;

export const TrackName = styled.span`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #d99207;
`;

export const ArtistName = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #d99207;
`;

export const TrackMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const Playing = styled.span`
  color: #d99207;
  height: 20px;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
`;

export const Control = styled.button`
  border: none;
  background-color: transparent;
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
`;

export const ProgressTime = styled.span`
  color: #d99207;
`;

export const ProgressBar = styled.progress`
  width: 300px;
  height: 10px;
  margin: 0px 5px;

  &:not([value]) {
    background-color: #fff;
  }

  &[value] {
    -webkit-appearance: none;
    appearance: none;
  }

  &[value]::-webkit-progress-bar {
    background-color: #fff;
    border-radius: 5px;
  }

  &[value]::-webkit-progress-value {
    background-color: #d99207;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
`;

export const Volume = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const VolumeBar = styled.input`
  -webkit-appearance: none;
  width: 100px;
  height: 5px;
  border-radius: 5px;
  background: ${props =>
    `linear-gradient(90deg, #d99207 ${props.value}%, #fff ${props.value}%)`};

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    background-color: #d99207;
    border-radius: 100%;
    margin-top: -5px;
  }
`;
