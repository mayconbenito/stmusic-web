import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #141414;
  width: 100%;
  height: 100%;
  position: fixed;
`;

export const Logo = styled.img`
  width: 300px;
`;

export const Description = styled.span`
  width: 270px;
  font-size: 18px;
  text-align: center;
  color: #d99207;
`;

export const DownloadButton = styled.button`
  margin-top: 20px;
  border: none;
  background-color: #d99207;
  padding: 7px 17px;
  font-size: 14px;
  border-radius: 17px;
  color: #000;
  margin-right: 5px;
  font-weight: bold;
  font-family: Roboto;
  cursor: pointer;
`;

export const AppVersion = styled.span`
  color: #606060;
  font-size: 14px;
  margin-top: 3px;
`;
