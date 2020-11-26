import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.darkestGray};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const NavigationButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

export const NavigationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.hover ? 'pointer' : 'normal')};
  height: 30px;
  background-color: ${(props) => props.theme.colors.lightBlack};
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.smallest};
  margin-right: ${(props) => props.theme.spacing.small};
  border: none;
  border-radius: ${(props) => props.theme.spacing.tiniest};

  &:hover {
    background-color: ${(props) =>
      props.hover ? '#202020' : props.theme.colors.lightBlack};
  }
`;

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 30px;
  background-color: ${(props) => props.theme.colors.lightBlack};
  color: ${(props) => props.theme.colors.primary};
  padding: ${(props) =>
    `${props.theme.spacing.smallest} ${props.theme.spacing.small}`};
  border: none;
  border-radius: ${(props) => props.theme.spacing.tiniest};
`;

export const UserInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 30px;
  padding: ${(props) => props.theme.spacing.smallest} 0px;
  padding-left: ${(props) => props.theme.spacing.smallest};
  border-radius: ${(props) => props.theme.spacing.tiniest};
  background-color: ${(props) => props.theme.colors.lightBlack};

  &:hover {
    background-color: #202020;
  }
`;

export const Name = styled.span`
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
  margin-left: ${(props) => props.theme.spacing.smallest};
`;

export const ArrowDown = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

export const Dropdown = styled.div`
  position: absolute;
  width: 100%;
  top: 35px;
  left: 0px;
  border-radius: ${(props) => props.theme.spacing.tiniest};
  background-color: ${(props) => props.theme.colors.lightBlack};
`;

export const DropdownItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 30px;
  background-color: ${(props) => props.theme.colors.lightBlack};
  padding: ${(props) => props.theme.spacing.small};
  width: 100%;
  margin-right: ${(props) => props.theme.spacing.small};
  border: none;
  border-radius: ${(props) => props.theme.spacing.tiniest};
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
  font-weight: 500;
  text-align: left;

  &:hover {
    background-color: #202020;
  }
`;
