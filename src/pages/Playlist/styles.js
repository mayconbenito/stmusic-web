import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  width: calc(100% - 180px);
  right: 0;
  top: 0;
  height: ${(props) =>
    props.theme.showPlayer ? 'calc(100% - 100px)' : '100%'};
  background-color: #141414;
  padding: 10px 15px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 780px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #d99207;
  padding-bottom: 5px;
`;

export const HeaderType = styled.span`
  color: #d99207;
  font-size: 14px;
  text-transform: uppercase;
`;

export const HeaderTitle = styled.h2`
  color: #d99207;
  font-size: 27px;
  font-weight: 300;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5px;
`;

export const Meta = styled.span`
  color: #d99207;
  font-size: 14px;
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: 10px;
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

export const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.span`
  color: #d99207;
  font-size: 24px;
`;

export const TracksList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0px;
`;
