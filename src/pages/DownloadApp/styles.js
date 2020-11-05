import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.darkestGray};
  width: 100%;
  height: 100%;
  position: fixed;
`;

export const Logo = styled.img`
  width: 300px;
`;

export const Description = styled.span`
  width: 270px;
  font-size: ${(props) => props.theme.fontSizes.baseFontSize};
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
`;

export const DownloadButton = styled.button`
  margin-top: ${(props) => props.theme.spacing.large};
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) =>
    `${props.theme.spacing.smaller} ${props.theme.spacing.base}`};
  font-size: ${(props) => props.theme.fontSizes.smallFontSize};
  border-radius: ${(props) => props.theme.spacing.base};
  color: ${(props) => props.theme.colors.black};
  margin-right: ${(props) => props.theme.spacing.smallest};
  font-weight: bold;
  font-family: Roboto;
  cursor: pointer;
`;

export const AppVersion = styled.span`
  color: ${(props) => props.theme.colors.mediumGray};
  font-size: ${(props) => props.theme.fontSizes.smallFontSize};
  margin-top: ${(props) => props.theme.spacing.tiny};
`;

export const AppVersionTag = styled.span`
  color: ${(props) => props.theme.colors.mediumGray};
  font-size: ${(props) => props.theme.fontSizes.smallFontSize};
  margin-left: ${(props) => props.theme.spacing.tiny};
`;
