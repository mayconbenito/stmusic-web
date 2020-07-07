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

export const Warning = styled.span`
  color: #d99207;
  font-weight: 500;
  font-size: 12px;
`;
