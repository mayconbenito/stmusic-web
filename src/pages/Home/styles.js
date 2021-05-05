import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  width: calc(100% - 180px);
  right: 0;
  top: 0;
  height: ${(props) =>
    props.theme.showPlayer ? 'calc(100% - 100px)' : '100%'};
  background-color: ${(props) => props.theme.colors.darkestGray};
  padding: ${(props) =>
    `${props.theme.spacing.small} ${props.theme.spacing.base}`};
  overflow-y: scroll;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const ContentTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.extraLargeFontSize};
  font-weight: normal;
  margin-top: ${(props) => props.theme.spacing.large};
`;

export const Section = styled.div`
  animation-name: fadeIn;
  animation-duration: 0.7s;
  animation-timing-function: ease-in-out;
  margin-bottom: ${(props) => props.theme.spacing.large};

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
