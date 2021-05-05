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
  margin-right: ${(props) => props.theme.spacing.smallest};
  margin-bottom: ${(props) => props.theme.spacing.smallest};
  max-width: 150px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing.tiny};
  cursor: pointer;
`;

export const Type = styled.span`
  color: ${(props) => props.theme.colors.mediumGray}; ;
`;

export const Name = styled.span`
  width: 150px;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.smallFontSize};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TextList = styled.span`
  flex-direction: row;
  color: ${(props) => props.theme.colors.mediumGray};
  font-size: ${(props) => props.theme.fontSizes.smallestFontSize};
`;

export const ArtistName = styled.span`
  color: ${(props) => props.theme.colors.mediumGray}; ;
`;

export const ToolbarButton = styled.div`
  position: absolute;
  top: ${(props) => props.theme.spacing.smallest};
  right: ${(props) => props.theme.spacing.smallest};
  z-index: 5;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
