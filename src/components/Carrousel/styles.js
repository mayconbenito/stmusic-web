import styled from 'styled-components';

export const CarrouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const Title = styled.span`
  font-size: 24px;
  color: #d99207;
`;

export const Buttons = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;

export const Button = styled.button`
  border: none;
  background-color: #d99207;
  padding: 5px 15px;
  font-size: 12px;
  border-radius: 15px;
  color: #000;
  margin-right: 5px;
  font-weight: bold;
  font-family: Roboto;
  cursor: pointer;
`;
