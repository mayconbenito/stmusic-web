import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  margin-bottom: 5px;
  width: ${props => (props.big ? '200px' : '100px')};
  height: ${props => (props.big ? '220px' : '120px')};
  cursor: pointer;
`;

export const ArtistsNames = styled.span`
  color: #606060;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
`;
