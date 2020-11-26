import styled from 'styled-components';

export const GlobalHeaderContainer = styled.div`
  padding: ${(props) =>
    `${props.theme.spacing.small} ${props.theme.spacing.base}`};
`;

export const Content = styled.div`
  position: fixed;
  width: calc(100% - 180px);
  right: 0;
  top: 0;
  height: ${(props) =>
    props.theme.showPlayer ? 'calc(100% - 100px)' : '100%'};
  background-color: ${(props) => props.theme.colors.darkestGray};
  overflow-y: scroll;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const SearchInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.large};
  border-bottom: 3px solid ${(props) => props.theme.colors.black};
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 60px;
  background-color: ${(props) => props.theme.colors.darkestGray};
  border: none;
  padding: ${(props) =>
    `${props.theme.spacing.small} ${props.theme.spacing.base}`};
  font-size: ${(props) => props.theme.fontSizes.largeFontSize};
  color: ${(props) => props.theme.colors.white};

  &::placeholder {
    font-family: Roboto;
    color: ${(props) => props.theme.colors.white};
  }
`;

export const ClearSearchButton = styled.button`
  margin-right: ${(props) => props.theme.spacing.base};
  border: none;
  background-color: transparent;
  cursor: pointer;

  svg:hover {
    color: ${(props) => props.theme.colors.lightPrimary} !important;
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  padding: ${(props) =>
    `${props.theme.spacing.small} ${props.theme.spacing.base}`};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.largest};
  animation-name: fadeIn;
  animation-duration: 0.7s;
  animation-timing-function: ease-in-out;

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

export const SectionTitle = styled.span`
  font-size: ${(props) => props.theme.fontSizes.biggestFontSize};
  color: ${(props) => props.theme.colors.primary};
`;

export const SectionItems = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;
