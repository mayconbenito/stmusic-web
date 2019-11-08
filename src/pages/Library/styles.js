import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  width: calc(100% - 180px);
  right: 0;
  top: 0;
  height: calc(100% - 100px);
  background-color: #141414;
  padding: 10px 15px;
`;

export const FixedHeader = styled.div`
  width: 100%;
  height: 90px;
  position: fixed;
  top: 0;
  background-color: #141414;
`;

export const ContentTitle = styled.h2`
  font-size: 40px;
  font-weight: normal;
`;

export const Menu = styled.div`
  dispay: flex;
  margin-top: 15px;
  padding-bottom: 5px;
`;

export const MenuItem = styled(Link)`
  color: #d99207;
  font-size: 18px;
  font-weight: 500;
  margin-right: 5px;
  border-bottom: ${props =>
    props.underline === 'show' ? '2px solid #d99207' : 'none'};
`;
