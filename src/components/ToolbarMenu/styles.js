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
  background-color: #141414;
  padding: 5px 0px;
  border-radius: 3px;
  -webkit-box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, 1);
  box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, 1);
`;

export const MenuItem = styled.span`
  color: #ffffff;
  line-height: 25px;
  padding: 4px 5px;
  font-size: 12px;
  white-space: nowrap;

  &:hover {
    background-color: #202020;
    cursor: pointer;
  }
`;
