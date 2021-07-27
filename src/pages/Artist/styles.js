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
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  padding-bottom: ${(props) => props.theme.spacing.smallest};
  margin-top: ${(props) => props.theme.spacing.large};
`;

export const HeaderType = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.smallFontSize};
  text-transform: uppercase;
`;

export const HeaderTitle = styled.h2`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.largeFontSize};
  font-weight: 300;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${(props) => props.theme.spacing.smallest};
`;

export const Meta = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.smallFontSize};
  margin-right: ${(props) => props.theme.spacing.smallest};
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: ${(props) => props.theme.spacing.small};
`;

export const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) =>
    `${props.theme.spacing.smallest} ${props.theme.spacing.base}`};
  font-size: ${(props) => props.theme.fontSizes.small};
  border-radius: ${(props) => props.theme.spacing.base};
  color: ${(props) => props.theme.colors.black};
  margin-right: ${(props) => props.theme.spacing.smallest};
  font-weight: bold;
  font-family: Roboto;
  cursor: ${(props) => (props.cursorPointer ? 'pointer' : 'default')};

  &:hover {
    background-color: ${(props) => props.theme.colors.lightPrimary};
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing.large};
  margin-top: ${(props) => props.theme.spacing.tiny};

  &:last-child {
    margin-bottom: 0px;
  }
`;

export const SectionTitle = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.biggestFontSize};
`;

export const SectionTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SectionPlayButton = styled.button`
  border: none;
  background: inherit;
  cursor: pointer;

  svg:hover {
    color: ${(props) => props.theme.colors.lightPrimary} !important;
  }
`;

export const TracksList = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing.smallest} 0px;
`;
