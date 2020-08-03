import styled from 'styled-components';

export const Container = styled.div`
  background-color: #141414;
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
  background-color: #0f0f0f;
  color: #fff;
  padding: 5px;
  margin-right: 10px;
  border: none;
  border-radius: 2px;
`;

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 30px;
  background-color: #0f0f0f;
  color: #d99207;
  padding: 5px 10px;
  border: none;
  border-radius: 2px;
`;

export const UserInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 5px 0px;
  padding-left: 5px;
  border-radius: 2px;
  background-color: #0f0f0f;
`;

export const Name = styled.span`
  font-size: 12px;
  color: #d99207;
  font-weight: 500;
  margin-left: 5px;
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
  border-radius: 2px;
  background-color: #0f0f0f;
`;

export const DropdownItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 30px;
  background-color: #0f0f0f;
  padding: 10px;
  width: 100%;
  margin-right: 10px;
  border: none;
  border-radius: 2px;
  color: #d99207;
  font-size: 12px;
  font-weight: 500;
  text-align: left;

  &:hover {
    background-color: #202020;
  }
`;
