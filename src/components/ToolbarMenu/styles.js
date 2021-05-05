import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

export const MenuItems = styled.div`
  position: absolute;
  display: ${(props) => (props.showMenuItems ? 'flex' : 'none')};
  flex-direction: column;
  z-index: 30;
  right: 0px;
  background-color: ${(props) => props.theme.colors.darkestGray};
  padding: ${(props) => props.theme.spacing.smallest} 0px;
  border-radius: ${(props) => props.theme.spacing.tiny};
  -webkit-box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, 1);
  box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, 1);
`;

export const MenuItem = styled.span`
  color: ${(props) => props.theme.colors.white};
  line-height: 25px;
  padding: ${(props) => props.theme.spacing.smallest};
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
  white-space: nowrap;

  &:hover {
    background-color: #202020;
    cursor: pointer;
  }
`;
