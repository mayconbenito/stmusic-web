import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  margin-bottom: 5px;
  width: 150px;
  cursor: pointer;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3px;
`;

export const Name = styled.span`
  font-size: 14px;
  color: #d99207;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const TextList = styled.span`
  color: #606060;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 10px;
`;

export const Type = styled.span``;
