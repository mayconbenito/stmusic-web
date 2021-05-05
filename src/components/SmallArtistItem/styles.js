import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: ${(props) => props.theme.spacing.smallest};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${(props) => props.theme.spacing.smallest};
`;

export const Name = styled.span`
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`;

export const Followers = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.smallestFontSize};
`;
