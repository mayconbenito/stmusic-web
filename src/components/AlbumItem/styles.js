import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  margin-bottom: 5px;
  width: ${props => (props.big ? '200px' : '150px')};
  cursor: pointer;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AlbumName = styled.span`
  font-size: ${props => (props.big ? '18px' : '14px')};
  color: #d99207;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ArtistsNames = styled.span`
  color: #606060;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${props => (props.big ? '14px' : '12px')};
`;
