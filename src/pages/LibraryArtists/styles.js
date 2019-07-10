import styled from 'styled-components';

export const ArtistList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
  overflow-y: scroll;
  margin-top: 80px;
  height: calc(100% - 80px);
`;

export const ArtistItem = styled.div`
  display: flex;
  margin-top: 5px;
`;

export const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

export const ArtistName = styled.span`
  color: #d99207;
  cursor: pointer;
`;

export const ArtistFollowers = styled.span`
  color: #d99207;
  font-size: 10px;
`;
