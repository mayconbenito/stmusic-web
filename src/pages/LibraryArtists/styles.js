import styled from 'styled-components';

export const ArtistList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  height: calc(100% - 130px);
`;

export const Warning = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
`;
