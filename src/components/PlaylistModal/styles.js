import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  width: 400px;
  height: 550px;
  padding: 5px 10px;
  border-radius: 3px;
  background-color: #000;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  height: 22px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d99207;
`;

export const HeaderTitle = styled.h2`
  font-size: 18px;
  color: #d99207;
`;

export const HeaderButton = styled.button`
  border: none;
  background-color: transparent;
  color: #d99207;
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding-top: 5px;
`;

export const Playlists = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const PlaylistOpacity = styled.div`
  display: none;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: -0%;
  overflow: hidden;
  position: absolute;
  transition: 0.5s;
`;

export const PlaylistItem = styled.div`
  display: flex;
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;

  &:hover ${PlaylistOpacity} {
    display: block;
  }
`;

export const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
`;

export const PlaylistTitle = styled.span`
  font-size: 16px;
  color: #d99207;
  font-weight: 500;
`;

export const PlaylistTracks = styled.span`
  color: #d99207;
  font-size: 12px;
  font-weight: 500;
`;

export const Warning = styled.span`
  color: #d99207;
  font-weight: 500;
  font-size: 12px;
`;
