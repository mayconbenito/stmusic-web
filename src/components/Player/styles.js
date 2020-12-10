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
  background-color: ${(props) => props.theme.colors.darkestGray};
  border-top: 3px solid ${(props) => props.theme.colors.black};
  padding: ${(props) => props.theme.spacing.base};
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
  margin-left: ${(props) => props.theme.spacing.smallest};
`;

export const TrackName = styled.span`
  font-size: ${(props) => props.theme.fontSizes.baseFontSize};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.colors.primary};
`;

export const ArtistName = styled.span`
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary};
`;

export const TrackMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const Playing = styled.span`
  color: ${(props) => props.theme.colors.primary};
  height: 20px;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
`;

export const Control = styled.button`
  border: none;
  cursor: ${(props) => (props.active ? 'pointer' : 'default')};
  background-color: transparent;

  svg:hover {
    color: ${(props) =>
      props.active && props.theme.colors.lightPrimary} !important;
  }
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
`;

export const ProgressTime = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;

export const ProgressBar = styled.progress`
  width: 300px;
  height: 10px;
  margin: 0px ${(props) => props.theme.spacing.smallest};

  &:not([value]) {
    background-color: ${(props) => props.theme.colors.white};
  }

  &[value] {
    -webkit-appearance: none;
    appearance: none;
  }

  &[value]::-webkit-progress-bar {
    background-color: ${(props) => props.theme.colors.white};
    border-radius: ${(props) => props.theme.spacing.smallest};
  }

  &[value]::-webkit-progress-value {
    background-color: ${(props) => props.theme.colors.primary};
    border-bottom-left-radius: ${(props) => props.theme.spacing.smallest};
    border-top-left-radius: ${(props) => props.theme.spacing.smallest};
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
  border-radius: ${(props) => props.theme.spacing.smallest};
  background: ${(props) =>
    `linear-gradient(90deg, ${props.theme.colors.primary} ${props.value}%, ${props.theme.colors.white} ${props.value}%)`};

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    border-radius: ${(props) => props.theme.spacing.smallest};
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 100%;
    margin-top: -5px;
  }
`;

export const PlayerQueueListContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.darkestGray};
  padding: ${(props) =>
    `${props.theme.spacing.smaller} ${props.theme.spacing.base}`};
  border-left: 3px solid ${(props) => props.theme.colors.black};
  width: 450px;
  height: ${(props) =>
    props.theme.showPlayer ? 'calc(100% - 100px)' : '100%'};
  overflow-y: scroll;
  overflow-x: hidden;

  & > div {
    margin-top: ${(props) => props.theme.spacing.smaller};
  }

  animation-name: fadeIn;
  animation-duration: 0.2s;
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

export const PlayerQueueListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlayerQueueListTitle = styled.span`
  font-size: ${(props) => props.theme.fontSizes.bigFontSize};
`;
