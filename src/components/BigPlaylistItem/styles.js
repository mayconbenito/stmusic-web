import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: ${(props) => props.theme.spacing.smallest};
  margin-bottom: ${(props) => props.theme.spacing.smallest};
  width: 150px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing.tiny};
`;

export const Name = styled.span`
  font-size: ${(props) => props.theme.fontSizes.smallFontSize};
  color: ${(props) => props.theme.colors.primary};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
`;

export const TextList = styled.span`
  color: ${(props) => props.theme.colors.mediumGray};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${(props) => props.theme.fontSizes.smallestFontSize};
`;

export const Type = styled.span`
  color: ${(props) => props.theme.colors.mediumGray};
`;
