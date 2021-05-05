import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  left: 0;
  width: 180px;
  height: ${(props) =>
    props.theme.showPlayer ? 'calc(100% - 100px)' : '100%'};
  background-color: ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: height 0.3s ease;
  z-index: 2;

  animation-name: fadeIn;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;

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

  @media (max-width: 780px) {
    display: none;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  padding-bottom: ${(props) => props.theme.spacing.smallest};
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing.smallest};
  align-items: center;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding-top: ${(props) => props.theme.spacing.smallest};
`;

export const MenuText = styled(Link)`
  font-family: Roboto;
  font-size: ${(props) => props.theme.fontSizes.biggestFontSize};
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  margin-left: ${(props) => props.theme.spacing.smallest};

  &:hover {
    color: ${(props) => props.theme.colors.lightPrimary};
  }
`;

export const CreatePlaylist = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing.smallest}
    ${(props) => props.theme.spacing.base} 0px
    ${(props) => props.theme.spacing.base};
`;

export const PlaylistInput = styled.input`
  height: 30px;
  padding: ${(props) =>
    `${props.theme.spacing.tiniest} ${props.theme.spacing.smallest}`};
  border-radius: ${(props) => props.theme.spacing.tiny};
  background-color: ${(props) => props.theme.colors.darkestGray};
  border: none;
  margin-top: ${(props) => props.theme.spacing.tiniest};
  color: ${(props) => props.theme.colors.primary};

  &::placeholder {
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const CreatePlaylistButton = styled.button`
  background-color: ${(props) => props.theme.colors.darkestGray};
  color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.spacing.tiny};
  margin-top: ${(props) => props.theme.spacing.smallest};
  border: none;
  padding: ${(props) => props.theme.spacing.smallest};
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #202020;
  }
`;
