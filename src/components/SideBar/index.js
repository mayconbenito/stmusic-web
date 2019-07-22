import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  MdHome, MdSearch, MdFolder, MdAudiotrack,
} from 'react-icons/md';

import {
  Container,
  Header,
  Logo,
  Menu,
  MenuItem,
  MenuText,
  Profile,
  Username,
  LogoutButton,
  PlaylistInput,
  CreatePlaylist,
  CreatePlaylistButton,
} from './styles';

import { Creators as PlaylistActions } from '../../store/ducks/playlist';
import session from '../../services/session';

function SideBar() {
  const dispatch = useDispatch();
  const [playlistInput, setPlaylistInput] = useState('');
  const { user } = session();

  function logout() {
    localStorage.removeItem('@STMusic:token');
  }

  function handlePlaylistName(e) {
    setPlaylistInput(e.target.value);
  }

  function handleSubmitPlaylist() {
    dispatch(PlaylistActions.requestCreatePlaylist(playlistInput));
    setPlaylistInput('');
  }

  return (
    <Container>
      <Header>
        <Logo>
          <MdAudiotrack size={40} color="#d99207" />
        </Logo>

        <Menu>
          <MenuItem>
            <MdHome size={36} color="#d99207" />
            <MenuText to="/">Ínicio</MenuText>
          </MenuItem>

          <MenuItem>
            <MdFolder size={36} color="#d99207" />
            <MenuText to="/library/playlists">Biblioteca</MenuText>
          </MenuItem>

          <MenuItem>
            <MdSearch size={36} color="#d99207" />
            <MenuText to="/search">Buscar</MenuText>
          </MenuItem>
        </Menu>
      </Header>

      <CreatePlaylist>
        <PlaylistInput id="playlistInput" value={playlistInput} onChange={handlePlaylistName} placeholder="Nome da playlist" />
        <CreatePlaylistButton onClick={handleSubmitPlaylist}>
          Criar Playlist
        </CreatePlaylistButton>
      </CreatePlaylist>

      <Profile>
        <Username href="#">
          Bem Vindo,
          <strong>{` ${user.name}`}</strong>
        </Username>
        <LogoutButton onClick={logout} href="#">Sair</LogoutButton>
      </Profile>
    </Container>
  );
}

export default React.memo(SideBar);
