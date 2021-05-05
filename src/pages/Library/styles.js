import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  width: calc(100% - 180px);
  right: 0;
  top: 0;
  height: ${(props) =>
    props.theme.showPlayer ? 'calc(100% - 100px)' : '100%'};
  background-color: ${(props) => props.theme.colors.darkestGray};
  padding: ${(props) =>
    `${props.theme.spacing.small} ${props.theme.spacing.base}`};
  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.darkestGray};
  margin-top: ${(props) => props.theme.spacing.large};
`;

export const ContentTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.extraLargeFontSize};
  font-weight: normal;
`;

export const Menu = styled.div`
  display: flex;
  padding-bottom: ${(props) => props.theme.spacing.smallest};
`;

export const MenuItem = styled(Link)`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.baseFontSize};
  font-weight: 500;
  margin-right: ${(props) => props.theme.spacing.smallest};
  border-bottom: ${(props) =>
    props.underline === 'show'
      ? `2px solid ${props.theme.colors.primary}`
      : 'none'};
`;
