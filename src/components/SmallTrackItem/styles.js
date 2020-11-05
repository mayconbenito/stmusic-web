import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: ${(props) => props.theme.spacing.smallest};

  &:last-child {
    margin-bottom: 0px !important;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing.tiny};
  margin-left: ${(props) => props.theme.spacing.smallest};
`;

export const Name = styled.span`
  width: 350px;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.smallFontSize};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
`;

export const Type = styled.span`
  color: ${(props) => props.theme.colors.mediumGray}; ;
`;

export const TextList = styled.span`
  flex-direction: row;
  color: ${(props) => props.theme.colors.mediumGray};
  font-size: ${(props) => props.theme.fontSizes.smallestFontSize};
`;

export const ArtistName = styled.span`
  color: ${(props) => props.theme.colors.mediumGray}; ;
`;
