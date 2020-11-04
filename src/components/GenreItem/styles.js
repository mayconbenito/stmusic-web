import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
  margin-right: ${(props) => props.theme.spacing.smallest};
  margin-bottom: ${(props) => props.theme.spacing.smallest};
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Name = styled.span`
  font-size: ${(props) => props.theme.fontSizes.headerFontSize};
  color: ${(props) => props.theme.colors.primary};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 500;
  cursor: pointer;
  text-align: center;
`;

export const Image = styled.div`
  width: 150px;
  height: 150px;
  background-color: #4d120f;
`;
