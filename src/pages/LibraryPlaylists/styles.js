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
  margin-top: 5px;
`;

export const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 5px;
`;

export const PlaylistMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlaylistName = styled.span`
  color: #d99207;
  cursor: pointer;
`;

export const PlaylistTracks = styled.span`
  color: #d99207;
  font-size: 10px;
`;

export const Warning = styled.span`
  color: #d99207;
  font-weight: 500;
  font-size: 12px;
`;
