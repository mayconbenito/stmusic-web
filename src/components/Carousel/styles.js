import styled from 'styled-components';

export const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.smallest};
`;

export const Title = styled.span`
  font-size: ${(props) => props.theme.fontSizes.biggestFontSize};
  color: ${(props) => props.theme.colors.primary};
`;

export const CarouselTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CarouselPlayButton = styled.button`
  border: none;
  background: inherit;
  cursor: pointer;
`;

export const Buttons = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;

export const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${(props) =>
    `${props.theme.spacing.smallest} ${props.theme.spacing.base}`};
  font-size: ${(props) => props.theme.fontSizes.smallerFontSize};
  border-radius: ${(props) => props.theme.spacing.base};
  color: ${(props) => props.theme.colors.black};
  margin-right: ${(props) => props.theme.spacing.smallest};
  font-weight: bold;
  font-family: Roboto;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.lightPrimary};
  }
`;
