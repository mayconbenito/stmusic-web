import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0px !important;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3px;
  margin-left: 5px;
`;

export const Name = styled.span`
  width: 350px;
  color: #d99207;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
`;

export const Type = styled.span`
  color: #606060;
`;

export const TextList = styled.span`
  flex-direction: row;
  color: #606060;
  font-size: 10px;
`;

export const ArtistName = styled.span`
  color: #606060;
`;
