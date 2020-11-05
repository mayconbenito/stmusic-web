import styled from 'styled-components';

export const PlaylistList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  height: calc(100% - 130px);
`;

export const PlaylistItem = styled.div`
  display: flex;
  margin-top: ${(props) => props.theme.spacing.smallest};
`;

export const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: ${(props) => props.theme.spacing.smallest};
`;

export const PlaylistMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlaylistName = styled.span`
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`;

export const PlaylistTracks = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.smallestFontSize};
`;

export const Warning = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
`;
