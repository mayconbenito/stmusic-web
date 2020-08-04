import styled from 'styled-components';

export const GlobalHeaderContainer = styled.div`
  padding: 10px 15px;
`;

export const Content = styled.div`
  position: fixed;
  width: calc(100% - 180px);
  right: 0;
  top: 0;
  height: ${(props) =>
    props.theme.showPlayer ? 'calc(100% - 100px)' : '100%'};
  background-color: #141414;
  overflow-y: scroll;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const SearchInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  border-bottom: 3px solid #000;
`;

export const SearchInput = styled.input`
  flex: 1;
  height: 60px;
  background-color: #141414;
  border: none;
  padding: 10px 15px;
  font-size: 26px;
  color: #fff;

  &::placeholder {
    font-family: Roboto;
    color: #fff;
  }
`;

export const ClearSearchButton = styled.button`
  margin-right: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  padding: 10px 15px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin-bottom: 30px;
  animation-name: fadeIn;
  animation-duration: 0.7s;
  animation-timing-function: ease-in-out;

  &:last-child {
    margin-bottom: 0px;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    15% {
      opacity: 0.15;
    }
    30% {
      opacity: 0.3;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const SectionTitle = styled.span`
  font-size: 24px;
  color: #d99207;
`;

export const SectionItems = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;
