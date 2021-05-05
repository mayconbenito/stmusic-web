import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  width: 400px;
  height: 550px;
  padding: ${(props) =>
    `${props.theme.spacing.smallest} ${props.theme.spacing.small}`};
  border-radius: ${(props) => props.theme.spacing.tiny};
  background-color: ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  height: ${(props) => props.theme.fontSizes.biggerFontSize};
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
`;

export const HeaderTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.headerFontSize};
  color: ${(props) => props.theme.colors.primary};
`;

export const HeaderButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
  padding-top: ${(props) => props.theme.spacing.smallest};
  margin-top: ${(props) => props.theme.spacing.tiny};
  overflow: auto;
`;

export const PlaylistOpacity = styled.div`
  display: none;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: -0%;
  overflow: hidden;
  position: absolute;
  transition: 0.5s;
`;

export const PlaylistItem = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing.smallest};
  position: relative;
  cursor: pointer;

  &:hover ${PlaylistOpacity} {
    display: block;
  }
`;

export const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => props.theme.spacing.smallest};
`;

export const PlaylistTitle = styled.span`
  font-size: ${(props) => props.theme.fontSizes.baseFontSize};
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
`;

export const PlaylistTracks = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
  font-weight: 500;
`;

export const Warning = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
`;
